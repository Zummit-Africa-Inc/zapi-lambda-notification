import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io'

@WebSocketGateway({
  cors:{
    origin : '*'
  }
})
export class NotificationsGateway implements OnGatewayInit{
  @WebSocketServer() 
  private server : Server;

  afterInit() {
    //emit init even when websocket starts
    this.server.emit('init')
  }

  async handleNewSubscription(apiId: string, profileId: string, developerId: string){
    // emit event to developer when a user subscribes
    this.server.emit(`newSubscription_${developerId}`, {
      apiId: apiId,
      profileId: profileId,
    }) 
  }

  async handleUnsubscription(apiId: string, profileId: string, developerId: string){
    // emit event to developer when a user unsubscribes
    this.server.emit(`unSubscription_${developerId}`, {
      apiId: apiId,
      profileId: profileId,
    })
  }

  async handleNewApiHosting(apiId: string, developerId: string){
    // emit event to developer when api is hosted
    this.server.emit(`apiHosted_${developerId}`, {
      apidId: apiId
    })
  }

  async handleApiDown(apiId: string, developerId: string){
    // emit event to developer when api is down
    this.server.emit(`apiDown_${developerId}`,{
      apidId: apiId
    })
  }
}
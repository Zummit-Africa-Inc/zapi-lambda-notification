import { NotificationStatus } from "../common/enums/notification.status.enum";
import { SharedEntity } from "../common/model/sharedEntity";
import { Column, Entity } from "typeorm";

@Entity()
export class Notification extends SharedEntity{
    @Column({nullable:true})
    notification_title: string

    @Column({nullable:false})
    notification_detail: string

    @Column({
        type: "enum",
        enum: NotificationStatus,
        default: NotificationStatus.UNREAD
    })
    notification_status: NotificationStatus

    @Column({nullable: false})
    developer_id: string
}
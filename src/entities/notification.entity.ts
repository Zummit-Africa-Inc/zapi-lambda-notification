import { NotificationImportance } from "../common/enums/notification.importance.enum";
import { NotificationStatus } from "../common/enums/notification.status.enum";
import { SharedEntity } from "../common/model/sharedEntity";
import { Column, Entity } from "typeorm";

@Entity()
export class Notification extends SharedEntity{
    @Column({nullable:true})
    notification_title: string

    @Column()
    notification_detail: string

    @Column({
        type: "enum",
        enum: NotificationStatus,
        default: NotificationStatus.UNREAD
    })
    notification_status: NotificationStatus

    @Column({
        type: "enum",
        enum: NotificationImportance,
        default: NotificationImportance.NOTURGENTNOTIMPORTANT  
    })
    notification_importance: NotificationImportance
}
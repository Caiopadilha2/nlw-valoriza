import { Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm"
import { v4 as uuid } from "uuid";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity("compliments")
class Compliment {
  
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_sender: string;

  @JoinColumn({ name: "user_sender" })
  @ManyToOne(() => User)
  userSender: User

  @Column()
  user_receiver: string;

  @JoinColumn({ name: "user_receiver" })
  @ManyToOne(() => User)
  userReceiver: User

  @Column()
  tag_id: string;

  @JoinColumn({name: "tag_id"})
  // Se eu fizer uma busca de um compliment pelo id, posso trazer
  // todas as informações da tag!! (id, name, created_at e updated_at)
  @ManyToOne(() => Tag)
  tag: Tag

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;

  constructor(){
    if(!this.id) {
      this.id = uuid();
    }
  }

}

export { Compliment }
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatprovider',
  templateUrl: './chatprovider.component.html',
  styleUrls: ['./chatprovider.component.css'
})
export class ChatProviderComponent implements OnInit {

    constructor(private ms: MessagingService, private router: Router) { }


  buildConversationsArray(conversations) {
    let array = [];

    for (let conversation in conversations) {
      array.push(conversations[conversation]);
    }

    return array
  }

ngOnInit() {
    if (!this.ms.app) {
      this.router.navigate(['/']);
    } else {
      this.ms.app.getConversations().then(conversations => {
        this.conversations = this.buildConversationsArray(conversations)
      })
    }
  }

selectConversation(conversationId: string) {
    this.ms.app.getConversation(conversationId).then(conversation => {
      this.selectedConversation = conversation

      Observable.from(conversation.events.values()).subscribe(
        event => {
          this.events.push(event)
        }
      )

      this.selectedConversation.on("text", (sender, message) => {
        this.events.push(message)
      })

      console.log("Selected Conversation", this.selectedConversation)
    }
    )
  }

  sendText(text: string) {
    this.selectedConversation.sendText(text).then(() => this.text = "")
  }

conversations: any
selectedConversation: any
text: string
events: Array<any> = []
}


}

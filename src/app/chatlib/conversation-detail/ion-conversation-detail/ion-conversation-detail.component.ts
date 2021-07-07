import { ConversationContentComponent } from '../conversation-content/conversation-content.component';
import { ChangeDetectorRef, Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { LoggerService } from 'src/chat21-core/providers/abstract/logger.service';

import { MESSAGE_TYPE_INFO, MESSAGE_TYPE_MINE, MESSAGE_TYPE_OTHERS } from 'src/chat21-core/utils/constants';
import { isChannelTypeGroup, isFirstMessage, isInfo, isMine, messageType } from 'src/chat21-core/utils/utils-message';
import { UploadService } from 'src/chat21-core/providers/abstract/upload.service';
@Component({
  selector: 'ion-conversation-detail',
  templateUrl: './ion-conversation-detail.component.html',
  styleUrls: ['./ion-conversation-detail.component.scss'],
})
export class IonConversationDetailComponent extends ConversationContentComponent implements OnInit {
 
  @Input() senderId: string;
  @Input() channelType: string;
  @Output() onImageRendered = new EventEmitter<boolean>() 
  @Output() onAddUploadingBubble = new EventEmitter<boolean>();
 

  public uploadProgress: number
  public fileType: any
  // public iterableDifferListConv: any

  // functions utils
  isMine = isMine;
  isInfo = isInfo;
  isFirstMessage = isFirstMessage;
  messageType = messageType;
  isChannelTypeGroup = isChannelTypeGroup;

  MESSAGE_TYPE_INFO = MESSAGE_TYPE_INFO;
  MESSAGE_TYPE_MINE = MESSAGE_TYPE_MINE;
  MESSAGE_TYPE_OTHERS = MESSAGE_TYPE_OTHERS;

  constructor(
    public cdref: ChangeDetectorRef,
    public uploadService: UploadService
  ) {
    super(cdref)

    this.listenToUploadFileProgress()
   
    // this.iterableDifferListConv = this.iterableDiffers.find([]).create(null);
  }

  listenToUploadFileProgress() {
    console.log('FIREBASE-UPLOAD ION-CONVERSATION-DETAIL calling BSStateUpload ');
    this.uploadService.BSStateUpload.subscribe((data: any) => {
      console.log('FIREBASE-UPLOAD ION-CONVERSATION-DETAIL BSStateUpload data', data);
     
      if (data) {
        console.log('FIREBASE-UPLOAD ION-CONVERSATION-DETAIL BSStateUpload data.upload', data.upload);
        console.log('FIREBASE-UPLOAD ION-CONVERSATION-DETAIL BSStateUpload data.upload typeof', typeof data.upload);
        this.uploadProgress = data.upload

        if (isNaN(data.upload))  {
          console.log('FIREBASE-UPLOAD ION-CONVERSATION-DETAIL BSStateUpload data.upload IS NaN (e.g. file size is 0)');
          this.uploadProgress = 100
        }
        // if (data.type.startsWith("application")) {
        if (!data.type.startsWith("image")) {
         
          this.fileType = 'file'

          this.addUploadingBubblePlaceholder(true)

          console.log('FIREBASE-UPLOAD ION-CONVERSATION-DETAIL BSStateUpload this.fileType', this.fileType);
        }

      }
    });
  }


  addUploadingBubblePlaceholder(value: boolean) {
    this.onAddUploadingBubble.emit(value);
  }


  ngOnInit() {
   
  }

  onImageRenderedFN(event){
    console.log('onImageRenderedFN:::ionic', event)
    this.onImageRendered.emit(event)
  }


}

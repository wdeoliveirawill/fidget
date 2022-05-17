import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

export interface SubmitFeedbackRequestData{
  type: string;
  comment: string;
  screenshot?: string;
}


export class SubmitFeedbackService {

  private feedbacksRepository: FeedbacksRepository;
  private mailAdapter: MailAdapter;

  constructor(feedbacksRepository: FeedbacksRepository, mailAdapter: MailAdapter) {
    this.feedbacksRepository = feedbacksRepository;
    this.mailAdapter = mailAdapter;
  }
  
  async submit(request: SubmitFeedbackRequestData) {
    const {type, comment, screenshot} = request;

    if(!type) {
      throw new Error("Type is required");
    }
    if(!comment) {
      throw new Error("Comment is required");
    }

    if(screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error('Invalid screenshot');
    }
    console.log("Creating...")
    await this.feedbacksRepository.create({type, comment, screenshot});
    console.log("Created...")
    console.log("send email...")
    await this.mailAdapter.sendMail({ 
      subject: 'Novo Feedback',
      body:  [
        `<div style="font-family: sans-serif; font-size:16px; color: #111;" >`,
      `<h1>Novo feedback</h1>`,
        `<p>Tipo: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : '',
        `</div>`].join('\n')
      })
      console.log("email sent")
  }
}
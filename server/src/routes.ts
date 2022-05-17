import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackService } from './services/submit-feedback-service';

export const routes = express.Router();



routes.post('/feedbacks', async (req, res) => {
  console.log("REQUEST")
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();  
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbacksService = new SubmitFeedbackService(prismaFeedbacksRepository, nodemailerMailAdapter);
  await submitFeedbacksService.submit(req.body);

  res.status(201).send();
});

routes.get('',(req, res) => {
  res.send('Hello World');
  })
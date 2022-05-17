/* eslint-disable @typescript-eslint/no-empty-function */
import { SubmitFeedbackService } from "./submit-feedback-service";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackService = new SubmitFeedbackService(
  {create: createFeedbackSpy},
  {sendMail: sendMailSpy}
);

describe("Submit Feedback Service", () => {
  it("should to be able to submit feedback", async () => {   

    await expect(submitFeedbackService.submit({
      type: "BUG",
      comment: "example",
      screenshot: "data:image/png;base64",
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toBeCalledTimes(1);
    expect(sendMailSpy).toBeCalledTimes(1);

  });

  it("should not to be able to submit feedback without type", async () => {   

    await expect(submitFeedbackService.submit({
      type: "",
      comment: "example",
      screenshot: "data:image/png;base64",
    })).rejects.toThrow();

  });

  it("should not to be able to submit feedback without comment", async () => {   

    await expect(submitFeedbackService.submit({
      type: "BUG",
      comment: "",
      screenshot: "data:image/png;base64",
    })).rejects.toThrow();

  });

  it("should not to be able to submit feedback with invalid screenshot data", async () => {   

    await expect(submitFeedbackService.submit({
      type: "BUG",
      comment: "some comment",
      screenshot: "WRONG DATA",
    })).rejects.toThrow();

  });
});
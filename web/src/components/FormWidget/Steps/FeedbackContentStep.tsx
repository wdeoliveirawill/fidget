import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedBackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButtonWidget } from "../../CloseButtonWidget";
import { LoadingWidget } from "../../LoadingWidget";
import { ScreenshotButtonWidget } from "../ScreenshotButtonWidget";

interface FeedbackTypeStepProps {
  feedbackType: FeedBackType;
  onHandleRestartFeedback: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onHandleRestartFeedback,
  onFeedbackSent,
}: FeedbackTypeStepProps) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();
    setIsSendingFeedback(true);
    await api.post("feedbacks", {
      type: feedbackType,
      screenshot,
      comment,
    });

    setIsSendingFeedback(false);
    onFeedbackSent();
  }

  return (
    <>
      <header className="">
        <button
          type="button"
          className="top-5 left-5 absolute tex-zinc-400 hover:text-zinc-100"
          onClick={onHandleRestartFeedback}
        >
          <ArrowLeft weight="bold" className="w-4 h-4>" />
        </button>
        <span className="text-xl leading-6 flex gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          ></img>
          {feedbackTypeInfo.title}
        </span>
        <CloseButtonWidget></CloseButtonWidget>
      </header>
      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={(event) => setComment(event.target.value)}
        ></textarea>

        <footer className="flex gap-2 mt-2">
          <ScreenshotButtonWidget
            onScreenshotTook={setScreenshot}
            screenshot={screenshot}
          />
          <button
            type="submit"
            disabled={!comment || isSendingFeedback}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isSendingFeedback ? <LoadingWidget /> : "Enviar Feedback"}
          </button>
        </footer>
      </form>
    </>
  );
}

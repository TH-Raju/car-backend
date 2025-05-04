import { Schema, model } from "mongoose";

const contactSchema = new Schema(
  {
    senderEmail: {
      type: String,
    },
    receiverEmail: {
      type: String,
    },
    subject: {
      type: String,
    },
    messageBody: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = model("Contact", contactSchema);
export default Contact;

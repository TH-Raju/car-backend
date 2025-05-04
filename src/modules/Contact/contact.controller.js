import catchAsync from "../../shared/catchAsync.js";
import sendResponse from "../../shared/sendResponse.js";
import { contactService } from "./contact.service.js";

const sendContacts = catchAsync(async (req, res) => {
  const contactData = req.body;
  const contact = await contactService.sendContact(contactData);

  if (contact) {
    sendResponse(res, 200, "Successfully send contact", contact);
  } else {
    sendResponse(res, 400, "Failed to send contact", {});
  }
});

export const contactController = {
  sendContacts,
};

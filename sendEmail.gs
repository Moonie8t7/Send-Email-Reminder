/**
 * @author u/IAmMoonie <https://www.reddit.com/user/IAmMoonie/>
 * @file https://www.reddit.com/r/sheets/comments/109a3nm/is_there_a_way_to_make_it_send_an_email_when_a
 * @desc Send email when column contains a date of today, send the info in a different column on the same row
 * @license MIT
 * @version 1.0
 */

/* A constant variable storing the email address of the person who will receive the email. */
const MY_EMAIL = "someAddress@gmail.com";

/* Storing the ID of the spreadsheet. */
const SHEET_ID = "someID";

/* Storing the name of the sheet. */
const SHEET_NAME = "Sheet1";

/**
 * Gets the data from the sheet, filters it only to include today's date, and then sends an email to
 * me with the contacts I need to talk to
 * @param {string} SHEET_ID - The ID of the spreadsheet.
 * @param {string} SHEET_NAME - The name of the sheet in the spreadsheet.
 * @param {string} MY_EMAIL - The email address that the emails will be sent to.
 * @throws {Error} If the data does not match the specified format.
 * @example
 * sendEmails();
 */
const sendEmails = () => {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  const today = new Date();
  const data = sheet.getDataRange().getValues();
  /* Filtering the data only to include today's date and then mapping it only to include the contact. */
  const contacts = data
    .filter(([_, date]) => {
      const sheetDate = new Date(date).toString().substring(4, 15);
      const todayDate = today.toString().substring(4, 15);
      return sheetDate === todayDate;
    })
    .map(([contact]) => contact);
  /* Checking if there are any contacts to talk to today. If there are, it will email me the contacts I need to talk to. */
  if (contacts.length > 0) {
    const subject =
      contacts.length > 1
        ? "System msg: you must talk to these people today"
        : `System msg: you must talk ${contacts[0]} today`;
    const message =
      contacts.length > 1
        ? `You need to talk to: \n${contacts.join("\n")}`
        : `You need to talk to ${contacts[0]} today.`;
    MailApp.sendEmail(MY_EMAIL, subject, message);
  }
};

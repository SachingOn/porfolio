const NOTIFICATION_EMAIL = "creativejungle86@gmail.com";

function doPost(e) {
  try {
    const data = parsePayload_(e);
    const submittedAt = data.timestamp || new Date().toISOString();

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      replyTo: data.email || NOTIFICATION_EMAIL,
      subject: "New Design with Yash project inquiry",
      body: buildEmailBody_(data, submittedAt)
    });

    return json_({ ok: true });
  } catch (error) {
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: "Design with Yash form error",
      body: String(error && error.stack ? error.stack : error)
    });
    return json_({ ok: false, error: String(error) });
  }
}

function doGet() {
  return json_({ ok: true, message: "Design with Yash email endpoint is live." });
}

function parsePayload_(e) {
  if (e && e.postData && e.postData.contents) {
    return JSON.parse(e.postData.contents);
  }
  return e && e.parameter ? e.parameter : {};
}

function buildEmailBody_(data, submittedAt) {
  return [
    "New website inquiry received.",
    "",
    "Submitted At: " + submittedAt,
    "Full Name: " + (data.fullName || ""),
    "Brand / Channel: " + (data.brandName || ""),
    "Email: " + (data.email || ""),
    "Instagram / Website / Channel Link: " + (data.link || ""),
    "Service Needed: " + (data.serviceNeeded || ""),
    "Requirement Type: " + (data.requirementType || ""),
    "Project Type: " + (data.projectType || ""),
    "Budget: " + (data.budget || ""),
    "",
    "Monthly Scope",
    "Static Posts: " + (data.staticPosts || ""),
    "Carousels: " + (data.carousels || ""),
    "Thumbnails: " + (data.thumbnails || ""),
    "Print Designs: " + (data.printDesigns || ""),
    "Other Monthly: " + (data.otherMonthly || ""),
    "",
    "One-Time Scope: " + (data.oneTimeDetails || ""),
    "Timeline: " + (data.timeline || ""),
    "Found From: " + (data.source || ""),
    "",
    "Project Brief:",
    data.brief || ""
  ].join("\n");
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

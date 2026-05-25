const webpush = require("web-push");

exports.handler = async (event) => {
  try {
    const { subscription, title, body } = JSON.parse(event.body);

    if (!subscription) {
      return {
        statusCode: 400,
        body: "Missing subscription",
      };
    }

    webpush.setVapidDetails(
      "mailto:test@test.com",
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );

    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title,
        body,
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.log("PUSH ERROR:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const { name } = req.body.input;

  if (/\d/.test(name)) {
    context.res.status = 400;
    context.res.json({
      message: "Artist name cannot include a number",
    });
  } else if (name) {
    context.res.json({
      name,
      id: 555,
    });
  } else {
    context.res.status = 400;
    context.res.json({
      message:
        "Please pass an artist on the query string or in the request body",
    });
  }
};

export default httpTrigger;

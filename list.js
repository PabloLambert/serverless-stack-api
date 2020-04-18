import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler( async (event, context) => {

  const params = {
    TableName: process.env.TableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };
  console.log("params: " + JSON.stringify(params));
  console.log("env   : " + JSON.stringify(process.env));

  const result = await dynamoDb.query(params);

  return result.Items;
});

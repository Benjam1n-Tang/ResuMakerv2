export const createSubSchema = (schema) => {
  const subSchema = schema.clone();
  subSchema.remove("user");
  subSchema.remove("_id");
  subSchema.set("timestamps", false);
  subSchema.set("_id", false); 
  return subSchema;
};
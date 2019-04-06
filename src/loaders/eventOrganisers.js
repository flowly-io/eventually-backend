import DataLoader from "dataloader";

const loader = db =>
  new DataLoader(async keys => {
    const uniqueKeys = new Set(keys);
    const results = await db
      .collection("users")
      .find({ _id: { $in: [...uniqueKeys] } });
    const data = await results.toArray();
    console.log(data);
    const dict = data.reduce(
      (acc, currentVal) => ({
        ...acc,
        [currentVal._id]: currentVal
      }),
      {}
    );

    return keys.map(key => dict[key]);
  });

export default loader;

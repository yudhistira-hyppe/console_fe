const Core = require('@alicloud/pop-core');

var client = new Core({
  accessKeyId: process.env.NEXT_PUBLIC_APSARA_ACCESS_KEY,
  accessKeySecret: process.env.NEXT_PUBLIC_APSARA_ACCESS_SECRET,
  endpoint: 'https://vod.ap-southeast-5.aliyuncs.com',
  apiVersion: '2017-03-21',
});

const uploadImageApsara = async (req, res) => {
  try {
    const responseUpload = await client
      .request(
        'CreateUploadImage',
        {
          Title: 'this is a sample',
          FileName: 'filename.jpg',
          RegionId: 'ap-southeast-5',
          ImageType: 'default',
        },
        { method: 'POST' },
      )
      .then(
        (result) => result,
        (error) => {
          console.log(error);
        },
      );

    res.status(200).send(responseUpload);
  } catch (err) {
    res.status(500).send({ error: 'failed to fetch data' });
  }
};

export default uploadImageApsara;

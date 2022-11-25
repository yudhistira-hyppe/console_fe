const Core = require('@alicloud/pop-core');

var client = new Core({
  accessKeyId: process.env.NEXT_PUBLIC_APSARA_ACCESS_KEY,
  accessKeySecret: process.env.NEXT_PUBLIC_APSARA_ACCESS_SECRET,
  endpoint: 'https://vod.ap-southeast-5.aliyuncs.com',
  apiVersion: '2017-03-21',
});

const uploadMediaApsara = async (req, res) => {
  try {
    const responseUpload = await client
      .request(
        'CreateUploadVideo',
        {
          Title: 'this is a sample',
          FileName: 'filename.mp4',
          RegionId: 'ap-southeast-5',
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

export default uploadMediaApsara;

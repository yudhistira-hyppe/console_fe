const uploadImage = (imageUploadDestination, file, onFinish, onFail) => {
  if (typeof window !== 'undefined') {
    const AliyunUpload = require('aliyun-upload-vod');

    const uploadFile = {
      file: file,
    };

    const uploader = new AliyunUpload.Vod({
      partSize: 1048576,
      parallel: 5,
      retryCount: 3,
      retryDuration: 2,

      onUploadSucceed: function (uploadInfo) {
        onFinish();
      },

      onUploadFailed: function (uploadInfo, code, message) {
        onFail();
      },
    });

    uploader.setUploadAuthAndAddress(
      uploadFile,
      imageUploadDestination.uploadAuth,
      imageUploadDestination.uploadAddress,
      imageUploadDestination.imageId,
    );

    uploader.addFile(file, null, null, null, '{"Vod":{"TemplateGroupId":"718c22b61310ede75f3aa68b33c8db1d"}}');
    uploader.startUpload();
  } else {
    onFail();
  }
};

export const onImageUpload = async (response, file, onFinish, onFail) => {
  if (!file) {
    return alert('file tidak boleh kosong!');
  } else {
    const destination = {
      imageId: response?.ImageId,
      uploadAddress: response?.UploadAddress,
      uploadAuth: response?.UploadAuth,
    };

    uploadImage(destination, file, onFinish, onFail);

    // console.log(destination, file);
  }
};

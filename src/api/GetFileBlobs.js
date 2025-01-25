// This file is auto-generated, don't edit it
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import devops20210625, * as $devops20210625 from '@alicloud/devops20210625';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import Util, * as $Util from '@alicloud/tea-util';


export default class Client {

  /**
   * @remarks
   * 使用AK&SK初始化账号Client
   * @returns Client
   * 
   * @throws Exception
   */
  static createClient() {
    // 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考。
    // 建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html。
    let config = new $OpenApi.Config({
      // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID。
      accessKeyId: process.env['ALIBABA_CLOUD_ACCESS_KEY_ID'],
      // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
      accessKeySecret: process.env['ALIBABA_CLOUD_ACCESS_KEY_SECRET'],
    });
    // Endpoint 请参考 https://api.aliyun.com/product/devops
    config.endpoint = `devops.cn-hangzhou.aliyuncs.com`;
    return new devops20210625(config);
  }

  static async main(args){
    let client = Client.createClient();
    let getFileBlobsRequest = new $devops20210625.GetFileBlobsRequest({
      organizationId: "601bc6022a8cae58be1e7e64",
      ref: "master",
      filePath: "package.json",
    });
    let runtime = new $Util.RuntimeOptions({ });
    let headers = { };
    try {
      // 复制代码运行请自行打印 API 的返回值
      await client.getFileBlobsWithOptions("4677932", getFileBlobsRequest, headers, runtime);
    } catch (error) {
      // 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
      // 错误 message
      console.log(error.message);
      // 诊断地址
      console.log(error.data["Recommend"]);
      
    }    
  }

}
import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'personio/1.0 (api/6.1.1)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * <p>This is the job positions XML feed from the Company Career Site.</p> <p>The XML feed
   * can be accessed in multiple languages, depending on the languages available for the
   * Career Site. To URL of the XML feed in English is:
   * https://{YOUR_COMPANY}.jobs.personio.de/xml?language=en</p> <p>This is the complete list
   * of available languages and URLs:</p> <ul>
   * <li>https://{YOUR_COMPANY}.jobs.personio.de/xml?language=de - German</li>
   * <li>https://{YOUR_COMPANY}.jobs.personio.de/xml?language=en - English</li>
   * <li>https://{YOUR_COMPANY}.jobs.personio.de/xml?language=fr - French</li>
   * <li>https://{YOUR_COMPANY}.jobs.personio.de/xml?language=es - Spanish</li>
   * <li>https://{YOUR_COMPANY}.jobs.personio.de/xml?language=nl - Dutch</li>
   * <li>https://{YOUR_COMPANY}.jobs.personio.de/xml?language=it - Italian</li>
   * <li>https://{YOUR_COMPANY}.jobs.personio.de/xml?language=pt - Portuguese</li> </ul>
   *
   * @summary Retrieve open positions
   */
  getXml(metadata: types.GetXmlMetadataParam): Promise<FetchResponse<200, types.GetXmlResponse200>> {
    return this.core.fetch('/xml', 'get', metadata);
  }

  /**
   * Allows you to create applications in Personio.
   *
   * @summary Creating applications in Personio
   * @throws FetchError<400, types.PostV1RecruitingApplicationsResponse400> Bad Request - The application could not be created because some properties of the
   * request did notch match their expectation. Check body for details.
   * @throws FetchError<403, types.PostV1RecruitingApplicationsResponse403> Forbidden - Your company does not have access to one of the features used in this
   * request.
   * @throws FetchError<500, types.PostV1RecruitingApplicationsResponse500> Internal Server Error - An unexpected error occurred. Check body for details.
   */
  postV1RecruitingApplications(body: types.PostV1RecruitingApplicationsBodyParam, metadata: types.PostV1RecruitingApplicationsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/recruiting/applications', 'post', body, metadata);
  }

  /**
   * Uploading files to this endpoint enables you to attach them to an application later.
   * Please keep in mind that the auto-generated code on the right-hand side when adding a
   * file from this tool should only be considered as a guide, and might not work when
   * copy-pasting in your code directly. Please refer to the documentation for the
   * language/library you are using on how to upload a multipart-form-data file.
   *
   * @summary Upload documents to be attached to applications
   * @throws FetchError<413, types.PostV1RecruitingApplicationsDocumentsResponse413> Payload Too Large - Your document exceeded the size limit. Check body for details.
   * @throws FetchError<422, types.PostV1RecruitingApplicationsDocumentsResponse422> Unprocessable Entity - The document you provided could not be processed. Check body for
   * details.
   * @throws FetchError<500, types.PostV1RecruitingApplicationsDocumentsResponse500> Internal Server Error - An unexpected error occurred. Check body for details.
   */
  postV1RecruitingApplicationsDocuments(body: types.PostV1RecruitingApplicationsDocumentsBodyParam, metadata: types.PostV1RecruitingApplicationsDocumentsMetadataParam): Promise<FetchResponse<200, types.PostV1RecruitingApplicationsDocumentsResponse200>> {
    return this.core.fetch('/v1/recruiting/applications/documents', 'post', body, metadata);
  }

  /**
   * <p><strong> DEPRECATED: This method of passing application to Personio is deprecated and
   * will only receive bugfixes. New implementations should interact with the
   * /v1/recruiting/applications endpoints above, existing implementators are advised to
   * migrate to them. </p> </strong>
   *
   * ---
   * <p> <strong>A note on categorised documents</strong><br/> Categorised documents are
   * represented as a multidimensional array. <br/> Each object has two fields: 'file' and
   * 'category'. The 'file' field contains an upload stream. The 'category field' contains
   * the category name, the allowed category names are listed in the table above. An example
   * in pseudo code would be: <br/> <pre> val request = HttpRequest()<br/><br/> // Example of
   * a CV file <br/> $data['categorised_documents[0][file]'] = new
   * CURLFile('/path/to/cv.pdf','application/pdf'); <br/>
   * $data['categorised_documents[0][category]'] = 'cv'; <br/><br/> // Example of a cover
   * letter file <br/> $data['categorised_documents[0][file]'] = new
   * CURLFile('/path/to/cover-letter.pdf','application/pdf'); <br/>
   * $data['categorised_documents[0][category]'] = 'cover-letter'; <br/><br/> // ... fill in
   * all the required params ... <br/><br/> // configure the CURL request <br/> $request =
   * curl_init('https://api.personio.de/recruiting/applicant'); <br/> curl_setopt($request,
   * CURLOPT_POST, 1); <br/> curl_setopt($request, CURLOPT_POSTFIELDS, $data); <br/><br/> //
   * Execute it <br/> curl_exec($request); </pre> </p> <p> <strong>A note on
   * documents</strong><br/> Documents need to be submitted as an upload stream not just with
   * a plain file path. An example in PHP code would be: <br/> <pre> $data['document1'] =
   * 'path-to-file' // this will not work! <br/> $data['document1'] = new
   * CURLFile('path-to-file') // Correct </pre> </p> <p> <strong>A note on
   * spamming</strong><br/> Please be aware that the access_token in company with your
   * company_id allows the creation of applications in your account. When building your own
   * career page, we would recommend that you call our endpoints from a backend service,
   * rather than from your frontend directly, in order to avoid making the token publicly
   * accessible. In addition to this, we recommend the inclusion of a captcha or similar into
   * your own career page to avoid bot applications. </p> <p> <strong>Rate
   * limiting</strong><br/> Our applicant API is a rate limit of 100 applications in 60
   * seconds per IP address. After submitting this amount of applications, you will need to
   * wait 60 seconds before you can submit more applications. </p>
   *
   * @summary Passing applications to Personio
   * @throws FetchError<400, types.PostRecruitingApplicantResponse400> Something went wrong and the application was not created in Personio. Specifically, the
   * following cases can lead to an error 400:
   * @throws FetchError<403, types.PostRecruitingApplicantResponse403> Something went wrong and the application was not created in Personio. In this case, the
   * API access token provided doesn't match the company ID.
   * @throws FetchError<422, types.PostRecruitingApplicantResponse422> Something is wrong with the request body or the attachments.
   * @throws FetchError<500, types.PostRecruitingApplicantResponse500> Something went wrong and the application was not created in Personio. This particular
   * case the transaction failed due to an issue on Personio's end, e.g. server error.
   * @throws FetchError<503, types.PostRecruitingApplicantResponse503> The server is currently unable to handle the request due to a temporary overload or
   * scheduled maintenance, which will likely be alleviated after some delay.
   */
  postRecruitingApplicant(body: types.PostRecruitingApplicantBodyParam, metadata: types.PostRecruitingApplicantMetadataParam): Promise<FetchResponse<200, types.PostRecruitingApplicantResponse200>> {
    return this.core.fetch('/recruiting/applicant', 'post', body, metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { GetXmlMetadataParam, GetXmlResponse200, PostRecruitingApplicantBodyParam, PostRecruitingApplicantMetadataParam, PostRecruitingApplicantResponse200, PostRecruitingApplicantResponse400, PostRecruitingApplicantResponse403, PostRecruitingApplicantResponse422, PostRecruitingApplicantResponse500, PostRecruitingApplicantResponse503, PostV1RecruitingApplicationsBodyParam, PostV1RecruitingApplicationsDocumentsBodyParam, PostV1RecruitingApplicationsDocumentsMetadataParam, PostV1RecruitingApplicationsDocumentsResponse200, PostV1RecruitingApplicationsDocumentsResponse413, PostV1RecruitingApplicationsDocumentsResponse422, PostV1RecruitingApplicationsDocumentsResponse500, PostV1RecruitingApplicationsMetadataParam, PostV1RecruitingApplicationsResponse400, PostV1RecruitingApplicationsResponse403, PostV1RecruitingApplicationsResponse500 } from './types';

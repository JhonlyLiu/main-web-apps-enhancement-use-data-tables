import Swal from 'sweetalert2';
import FormData from "form-data";
import { APIBaseUriIsNotSetException } from "../common/exception/global/APIBaseUriIsNotSetException";
import Cookies from 'js-cookie';

/**
 * ApiHandler
 *
 * A namespace to create a HTTP Request for MIT Project.
 */
export namespace ApiHandler {

  /**
   * handleRequest
   *
   * This function will serve a HTTP Request.
   *
   * @param method
   * @param uri
   * @param data
   * @param header
   * @param multipart
   * @param useAccessToken
   * @returns
   */
  export async function handleRequest(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    uri: string,
    data?: any,
    header?: any,
    multipart: boolean = false,
    useAccessToken: boolean = true
  ): Promise<any> {
    
    if (!process.env.NEXT_PUBLIC_API_URI_BASE) {
      throw new APIBaseUriIsNotSetException();
    }

    const finalHeader: any = {};
    let finalData: any = {};
    let finalUri: string = uri;

    // Handle GET Method
    // Final productnya: url with query param
    // @example example.com/api/example?data1=value1&data2=value2
    if (method === 'GET' && data) {
      let queryParam: string = '?';

      // Loop every query param, and generate queryParam string
      for (const e in data) {
        queryParam += `${e}=${data[e]}&`;
      }

      finalUri = finalUri + queryParam;
      finalData = undefined;
    } else {

      // Handle anything other than GET Method
      if (multipart) {

        // Initialize FormData
        const formData = new FormData();

        // Masukin data-datanya ke FormData
        for (const e in data) {
          if (data[e] !== null) {
            formData.append(e, data[e]);
          }
        }

        finalData = formData;
      } else {
        Object.assign(finalHeader, {
          "Content-Type": "application/json"
        })
        finalData = JSON.stringify(data);
      }
    }

    if (header) {
      Object.assign(finalHeader, header);
    }

    if (useAccessToken) {
      Object.assign(finalHeader, {
        "Authorization": "Bearer " + Cookies.get('token')
      })
    }

    // Building Headers
    const requestHeader = new Headers();
    Object.keys(finalHeader).forEach((e: string) => {
      requestHeader.append(e, finalHeader[e]);
    })

    return fetch(finalUri, {
      "method": method,
      "headers": requestHeader,
      "body": finalData
    }).then((response: Response) => response.json())
      .then(body => {
        if (body.code.includes("UMA0001") && useAccessToken) {
            Swal.fire({
                title: 'Sesi berakhir!',
                text: 'Sesi anda telah berakhir. Silahkan login kembali.',
                icon: 'warning'
            })
          Cookies.remove("token");
          window.location.href = '/';
        }

        return body;
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  /**
   * handleRequestWithoutAccessToken
   *
   * Just another handleRequest, but without access token
   *
   * @param method
   * @param uri
   * @param data
   * @param header
   * @param multipart
   * @returns
   */
  export async function handleRequestWithoutAccessToken(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    uri: string,
    data?: any,
    header?: any,
    multipart: boolean = false
  ): Promise<any> {
    return handleRequest(method, uri, data, header, multipart, false);
  }
}
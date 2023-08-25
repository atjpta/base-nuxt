const config = useRuntimeConfig();

interface IStatus {
  code: number;
  description: string;
}

interface IBaseResponseHttp {
  status?: IStatus;
  message?: string;
  data?: any[];
  error?: any[];
  timestamp?: string;
}

class BaseService {
  private static baseUrl: string = `${config.public.apiBase}/api/v1`;
  private static token: string = '';
  private static refreshToken: string = '';

  private filter(res: IBaseResponseHttp) {
    if (res.status?.code == BaseHttpStatus.SERVER_ERROR.code) {
      navigateTo('/error/500');
    }
    if (
      res.status?.code != BaseHttpStatus.OK.code &&
      res.status?.code != BaseHttpStatus.CREATED.code
    ) {
      console.log('--- status ---');
      console.log(res.status);
      console.log('--- message ---');
      console.log(res.message);
      console.log('--- error ---');
      console.log(res.error);
      console.log('--- timestamp ---');
      console.log(res.timestamp);
      throw Error(res.status?.code.toString());
    }
    return res.data;
  }

  public setToken(token: string) {
    BaseService.token = token;
  }

  public setRefreshToken(token: string) {
    BaseService.refreshToken = token;
  }

  public async get(url: string) {
    const { data, error, status } = await useFetch<IBaseResponseHttp>(
      BaseService.baseUrl + url,
      {
        headers: {
          authorization: `Bearer ${BaseService.token}`,
        },
        method: 'get',
      },
    );

    if (error.value || status.value == 'error') {
      console.log('--- error get ---');
      console.log(error.value?.toString());
    }

    return this.filter(data.value as IBaseResponseHttp);
  }

  public async post(url: string, body: any) {
    const { data, error, status } = await useFetch<IBaseResponseHttp>(
      BaseService.baseUrl + url,
      {
        headers: {
          authorization: `Bearer ${BaseService.token}`,
        },
        body,
        method: 'post',
      },
    );

    if (error.value || status.value == 'error') {
      console.log('--- error get ---');
      console.log(error.value?.toString());
    }

    return this.filter(data.value as IBaseResponseHttp);
  }

  public async put(url: string, body: any) {
    const { data, error, status } = await useFetch<IBaseResponseHttp>(
      BaseService.baseUrl + url,
      {
        headers: {
          authorization: `Bearer ${BaseService.token}`,
        },
        body,
        method: 'put',
      },
    );

    if (error.value || status.value == 'error') {
      console.log('--- error get ---');
      console.log(error.value?.toString());
    }

    return this.filter(data.value as IBaseResponseHttp);
  }
  public async delete(url: string) {
    const { data, error, status } = await useFetch<IBaseResponseHttp>(
      BaseService.baseUrl + url,
      {
        headers: {
          authorization: `Bearer ${BaseService.token}`,
        },
        method: 'delete',
      },
    );

    if (error.value || status.value == 'error') {
      console.log('--- error get ---');
      console.log(error.value?.toString());
    }

    return this.filter(data.value as IBaseResponseHttp);
  }
}

export class BaseHttpStatus {
  // Client success
  static OK: IStatus = {
    code: 200,
    description: 'Query success',
  };
  static CREATED: IStatus = {
    code: 201,
    description: 'Create success',
  };
  static UPDATE: IStatus = {
    code: 200,
    description: 'Update success',
  };
  static DELETE: IStatus = {
    code: 200,
    description: 'Delete success',
  };

  // Client exception
  static BAB_REQUEST: IStatus = {
    code: 400,
    description: 'Bad request',
  };
  static UNAUTHORIZED: IStatus = {
    code: 401,
    description: 'Unauthorized',
  };
  static FORBIDDEN: IStatus = {
    code: 403,
    description: 'Forbidden',
  };
  static NO_FOUND: IStatus = {
    code: 404,
    description: 'Not found',
  };
  static NOT_ACCEPT: IStatus = {
    code: 406,
    description: 'Not acceptable',
  };
  static CONFLICT: IStatus = {
    code: 409,
    description: 'Conflict',
  };
  static UNPROCESSABLE_ENTITY: IStatus = {
    code: 422,
    description: 'Unprocessable entity',
  };

  // Server exception
  static SERVER_ERROR: IStatus = {
    code: 500,
    description: 'Server error',
  };
}

export default {
  BaseHttpStatus,
  BaseService,
};

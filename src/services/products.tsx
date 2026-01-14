import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, API_URL } from "../config";
import type { IGoodsItemProps } from "../components/GoodsItem/GoodsItem.props";

type GoodsResponse = { shop: IGoodsItemProps[] };

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
      baseUrl: API_URL,
      prepareHeaders: (headers) => {
        headers.set('Authorization', API_KEY);
      //  headers.set('Authorization', '29131446-97e140c9-30f73980-74f10bce');
        return headers;
      },
    }),
    endpoints: (builder) => ({
      getProducts: builder.query<IGoodsItemProps[], void>({
        query: () => ({ url: '', params: { lang: 'en' } }),
        transformResponse: (res: GoodsResponse) => res.shop,
      }),
    }),
  });
  
  export const { useGetProductsQuery } = productsApi;


  /*
  Это кусок кода с RTK Query (часть Redux Toolkit), который создает “мини-клиент” для запросов к API. Давай разберём почти построчно, что тут происходит.

  1) Типы и настройки

  createApi и fetchBaseQuery — это функции из RTK Query.
  API_URL — базовый адрес сервера, куда ходим за данными.
  GoodsItemProps — тип одного товара.
  GoodsResponse — тип ответа от сервера: объект, в котором есть поле shop, а в shop массив товаров.

  То есть сервер отвечает примерно так:
  {
    "shop": [
      { товар 1  },
      { товар 2 }
    ]
  }

  2) Создание API-слайса
  export const productsApi = createApi({
    .........
  
  reducerPath: 'productsApi'
  Имя “среза” в Redux-сторе. В сторе будет ветка state.productsApi.  

  baseQuery: fetchBaseQuery({...})
  fetchBaseQuery — это обёртка над fetch, которая:

    - добавляет базовый URL,
    - автоматически сериализует параметры,
    - возвращает данные в удобном виде для RTK Query.

    baseUrl — всё, что ты укажешь в query().url, будет подставляться относительно этого базового URL.
      - prepareHeaders — функция, которая перед каждым запросом может добавить/изменить заголовки.
      - Здесь ты добавляешь заголовок Authorization с API-ключом.
      - То есть каждый запрос будет отправляться с этим ключом.

    endpoints: (builder) => ({ ... })
    Здесь описываются конкретные запросы (endpoints) к API.
    Это один endpoint — getProducts.

    builder.query<GoodsItemProps[], void>:
      Первый тип <GoodsItemProps[]> — какой тип данных будет возвращаться в компонент (после transformResponse).
      Второй тип void — какой тип аргумента принимает этот запрос (здесь ничего не нужно передавать, поэтому void).

    query: () => ({ ... })
    Функция, которая говорит RTK Query, как формировать сам HTTP-запрос.
      url: '' — значит фактический URL будет API_URL + '' → просто API_URL.
      params: { lang: 'en' } — query-параметры, получится запрос вида:
        GET  {API_URL}?lang=en
    Плюс к этому добавятся заголовки Authorization из prepareHeaders.
    
    transformResponse: (res: GoodsResponse) => res.shop
    Сервер возвращает объект вида { shop: [...] }, но тебе в компонентах удобнее сразу иметь [...].
    transformResponse:
      принимает “сырой” ответ от сервера res,
      возвращает только res.shop.
    То есть в data в компоненте ты сразу получаешь GoodsItemProps[], а не { shop: GoodsItemProps[] }.
    
    3. Хук для компонентов
    export const { useGetProductsQuery } = productsApi;
      RTK Query автоматически генерирует React-хуки для каждого endpoint’а:
      для getProducts → хук useGetProductsQuery.

*/

/*
  1. Когда компонент монтируется:
    useGetProductsQuery() триггерит запрос:
      Собирает URL: API_URL?lang=en.
      Добавляет заголовки (Authorization).
      Делает fetch.
  2. Когда ответ приходит, применяется transformResponse → из { shop: [...] } делается просто [...].
  3. Redux сохраняет результат в state.productsApi.
  4. Хук отдает в компонент:
    data — товары (GoodsItemProps[]),
    isLoading — состояние загрузки,
    error — ошибка (если была).
*/

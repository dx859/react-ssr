import App from "./views/App";
import Layout from "./views/Layout";
import NotFound from "./views/NotFound";
import Home from "./views/Home";

export default [
  {
    path: "/",
    component: App,
    key: "app",
    loadData: App.loadData,
    routes: [
      {
        path: "/404",
        component: NotFound,
        key: "notFound"
      },
      {
        path: "/:tenant",
        component: Layout,
        key: "home",
        routes: [
          {
            path: "",
            exact: true,
            component: Home,
            key: "home",
            loadData: Home.loadData
          }
        ]
      }
    ]
  }
];

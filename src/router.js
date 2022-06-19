import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    alias: "/todo",
    name: "todo",
    component: () => import("./components/TodoList"),
  },
  {
    path: "/todo/:id",
    name: "todo-details",
    component: () => import("./components/Todo"),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddTodo"),
  },
  {
    path: "/mint",
    name: "mint-NFT",
    component: () => import("./components/MintNFT"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

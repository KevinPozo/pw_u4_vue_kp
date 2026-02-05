import { reactive } from "vue";

const state = reactive({
  notifications: [],
});

let nextId = 1;

const addNotification = (message, type = "info", timeout = 3000) => {
  const id = nextId++;
  state.notifications.push({
    id,
    message,
    type,
    timeout,
  });

  if (timeout) {
    setTimeout(() => {
      removeNotification(id);
    }, timeout);
  }
};

const removeNotification = (id) => {
  const index = state.notifications.findIndex((n) => n.id === id);
  if (index !== -1) {
    state.notifications.splice(index, 1);
  }
};

export const useNotificationStore = () => {
  return {
    state,
    addNotification,
    removeNotification,
  };
};

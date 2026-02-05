<template>
  <div class="notification-container">
    <transition-group name="toast-list">
      <NotificationToast
        v-for="notification in notifications"
        :key="notification.id"
        :message="notification.message"
        :type="notification.type"
        :timeout="notification.timeout"
        @close="remove(notification.id)"
      />
    </transition-group>
  </div>
</template>

<script>
import { useNotificationStore } from "./NotificationStore";
import NotificationToast from "./NotificationToast.vue";
import { computed } from "vue";

export default {
  name: "NotificationContainer",
  components: {
    NotificationToast,
  },
  setup() {
    const { state, removeNotification } = useNotificationStore();

    return {
      notifications: computed(() => state.notifications),
      remove: removeNotification,
    };
  },
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Transitions */
.toast-list-enter-active,
.toast-list-leave-active {
  transition: all 0.4s ease;
}

.toast-list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.toast-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

<template>
  <div :class="['toast', type]" @click="$emit('close')">
    <div class="toast-content">
      <span class="icon" v-if="type === 'success'">✓</span>
      <span class="icon" v-if="type === 'error'">✕</span>
      <span class="icon" v-if="type === 'info'">ℹ</span>
      <p>{{ message }}</p>
    </div>
    <div class="progress-bar" v-if="showProgress"></div>
  </div>
</template>

<script>
export default {
  name: "NotificationToast",
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "info", // success, error, info
      validator: (value) => ["success", "error", "info"].includes(value),
    },
    timeout: {
      type: Number,
      default: 3000,
    },
  },
  emits: ["close"],
  data() {
    return {
      showProgress: true,
    };
  },
};
</script>

<style scoped>
.toast {
  width: 300px;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  animation: slideIn 0.3s ease-out forwards;
  backdrop-filter: blur(10px);
  color: white;
  display: flex;
  flex-direction: column;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon {
  font-weight: bold;
  font-size: 1.2em;
  background: rgba(255, 255, 255, 0.2);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.toast p {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

/* Types */
.success {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  border-left: 5px solid #1e8449;
}

.error {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  border-left: 5px solid #922b21;
}

.info {
  background: linear-gradient(135deg, #3498db, #2980b9);
  border-left: 5px solid #1f618d;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>

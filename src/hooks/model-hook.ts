import { ref, watch, getCurrentInstance } from "vue";

/**
 *
 * e.g
 *
 *
 * 父组件
 * <Child v-model:value="a" v-model:active="b" />
 *
 * 子组件
 *
 * <template>
 * <input v-model="modelValue" />
 * <input v-model="active" />
 *
 * </template>
 * const props = defineProps({
 * modelValue: {},
 * active: {}
 * })
 *
 *
 * const modelValue = useVmodel(props, "modelValue");
 * const active = useVmodel(props, "active");
 *
 *
 *
 *
 */
export function useVmodel(props, key?: string, emit?: any) {
  key = key || "modelValue";
  const vm = getCurrentInstance();
  const _emit = emit || vm?.emit;
  const event = `update:${key}`;
  const proxy = ref(props[key]);
  watch(
    () => proxy.value,
    v => _emit(event, v)
  );
  return proxy;
}

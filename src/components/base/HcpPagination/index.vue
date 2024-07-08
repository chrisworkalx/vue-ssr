<template>
  <ul class="Pagination">
    <li v-if="!hideFirstButton" class="PaginationControl">
      <svg-icon
        name="page-first"
        class="Control"
        :class="{ 'Control-active': isPrevControlsActive }"
        @click="goToFirst"
      ></svg-icon>
    </li>
    <li class="PaginationControl">
      <svg-icon
        name="chevron-left"
        class="Control"
        :class="{ 'Control-active': isPrevControlsActive }"
        @click="goToPrev"
      ></svg-icon>
    </li>
    <v-page
      v-for="page in pagination"
      :key="`pagination-page-${page}`"
      :page="page"
      :current="modelValue"
      :active-color="activeColor"
      @update="updatePageHandler"
    />
    <li class="PaginationControl">
      <svg-icon
        name="chevron-right"
        class="Control"
        :class="{ 'Control-active': isNextControlsActive }"
        @click="goToNext"
      ></svg-icon>
    </li>
    <li v-if="!hideLastButton" class="PaginationControl">
      <svg-icon
        name="page-last"
        class="Control"
        :class="{ 'Control-active': isNextControlsActive }"
        @click="goToLast"
      ></svg-icon>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import VPage from "./atoms/VPage.vue";

export default defineComponent({
  name: "HcpPagination",
  components: {
    VPage
  },
  props: {
    pages: {
      type: Number,
      default: 0
    },
    rangeSize: {
      type: Number,
      default: 1
    },
    modelValue: {
      type: Number,
      default: 0
    },
    activeColor: {
      type: String,
      default: "#ab0165"
    },
    hideFirstButton: {
      type: Boolean,
      default: false
    },
    hideLastButton: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "update:pages"],

  setup(props, { emit }) {
    // pagination
    const pagination = computed((): (number | null)[] => {
      const res = [];
      const minPaginationElems = 5 + props.rangeSize * 2;

      let rangeStart =
        props.pages <= minPaginationElems
          ? 1
          : props.modelValue - props.rangeSize;
      let rangeEnd =
        props.pages <= minPaginationElems
          ? props.pages
          : props.modelValue + props.rangeSize;

      rangeEnd = rangeEnd > props.pages ? props.pages : rangeEnd;
      rangeStart = rangeStart < 1 ? 1 : rangeStart;

      if (props.pages > minPaginationElems) {
        const isStartBoundaryReached = rangeStart - 1 < 3;
        const isEndBoundaryReached = props.pages - rangeEnd < 3;

        if (isStartBoundaryReached) {
          rangeEnd = minPaginationElems - 2;
          for (let i = 1; i < rangeStart; i++) {
            res.push(i);
          }
        } else {
          res.push(1);
          res.push(null);
        }

        if (isEndBoundaryReached) {
          rangeStart = props.pages - (minPaginationElems - 3);
          for (let i = rangeStart; i <= props.pages; i++) {
            res.push(i);
          }
        } else {
          for (let i = rangeStart; i <= rangeEnd; i++) {
            res.push(i);
          }
          res.push(null);
          res.push(props.pages);
        }
      } else {
        for (let i = rangeStart; i <= rangeEnd; i++) {
          res.push(i);
        }
      }

      return res;
    });

    function updatePageHandler(params: number) {
      emit("update:modelValue", params);
      emit("update:pages", params);
    }

    // controls
    const isPrevControlsActive = computed((): boolean => {
      return props.modelValue > 1;
    });
    const isNextControlsActive = computed((): boolean => {
      return props.modelValue < props.pages;
    });

    function goToFirst(): void {
      if (isPrevControlsActive.value) {
        emit("update:modelValue", 1);
        emit("update:pages", 1);
      }
    }
    function goToPrev(): void {
      if (isPrevControlsActive.value) {
        emit("update:modelValue", props.modelValue - 1);
        emit("update:pages", props.modelValue - 1);
      }
    }

    function goToLast(): void {
      if (isNextControlsActive.value) {
        emit("update:modelValue", props.pages);
        emit("update:pages", props.pages);
      }
    }
    function goToNext(): void {
      if (isNextControlsActive.value) {
        emit("update:modelValue", props.modelValue + 1);
        emit("update:pages", props.modelValue + 1);
      }
    }

    return {
      pagination,
      updatePageHandler,
      isPrevControlsActive,
      isNextControlsActive,
      goToFirst,
      goToLast,
      goToPrev,
      goToNext
    };
  }
});
</script>

<style scoped lang="less">
@import "../../../styles/_settings.less";

.Pagination {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style-type: none;
  justify-content: flex-end;
}

.PaginationControl {
  display: flex;
  align-items: center;
}

.Control {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  margin: 0 2px;
  fill: @grey_01;

  &-active {
    fill: @black_01;
    cursor: pointer;
    transition: fill 0.2s ease-in-out;

    &:hover {
      fill: @black_00;
      transition: fill 0.2s ease-in-out;
    }
  }
}
</style>

<script lang="tsx">
import { defineComponent } from "vue";

export default defineComponent({
  name: "content-detail-item",
  props: {
    title: {
      type: String,
      default: ""
    },
    content: {
      type: [String, Number],
      default: ""
    },
    isHighLight: {
      type: Boolean,
      default: false
    },
    colSpan: {
      type: Number,
      default: 24
    },
    index: {
      type: Number,
      default: 0
    }
  },
  setup(props, { slots }) {
    return () => (
      <van-col span={props.colSpan} style="word-break: break-word;">
        <div class="content_detail_wrapper">
          <div class="left_title">{props.title + "："}</div>
          <div class={["right_content", props.isHighLight ? "high_light" : ""]}>
            {slots?.default?.() || props.content}
          </div>
        </div>
      </van-col>
    );
  }
});
</script>

<style scoped lang="less">
.content_detail_wrapper {
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 16px;
  flex-wrap: nowrap;
  .left_title {
    color: #8a8e8e;
    flex-shrink: 0;
  }
  .right_content {
    flex: 1;
    word-wrap: break-word;
    padding-right: 4px;
    box-sizing: border-box;
    &.high_light {
      color: var(--van-primary-color);
    }
    color: #3c4242;
  }
}
</style>

<template>
  <div class="file_uploader_wrapper">
    <label
      :for="id"
      class="image_wrapper"
      :style="`width: ${width}; height: ${height}`"
    >
      <img class="image" ref="image" :src="fileSrc" />
    </label>
    <div class="clearButton" v-if="hasImage" @click="removeImage">
      <span class="mdi mdi-close"></span>
    </div>
    <input
      class="custom_file_uploader_for_employee"
      v-if="!readOnly"
      @change="fileChanged"
      :accept="allowedFile"
      ref="fileUploader"
      type="file"
      :id="id"
    />
  </div>
</template>


<script>
import DxButton from "devextreme-vue/button";

export default {
  components: {
    DxButton,
  },
  props: {
    path: {
      type: String,
      default: null,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: "120px",
    },
    width: {
      type: String,
      default: "120px",
    },
    id: {
      type: String,
      default: "custom_file_uploader_for_employee",
    },
  },
  data() {
    return {
      allowedFileExtensions: [".png", ".jpeg", ".jpg"],
      file: null,
      pathToImage: this.path,
      fileSrc: require("@/static/icons/image-default.png"),
      imageIsUploaded: false,
    };
  },
  computed: {
    allowedFile() {
      return this.allowedFileExtensions.join();
    },
    hasImage() {
      return this.pathToImage || this.imageIsUploaded;
    },
  },
  methods: {
    fileChanged(e) {
      const file = this.$refs.fileUploader.files[0];
      this.$emit("valueChanged", file);
      this.imageIsUploaded = true;
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const dataURL = reader.result;
          this.fileSrc = dataURL;
        };
        reader.readAsDataURL(file);
      }
    },
    removeImage() {
      this.$refs["fileUploader"].value = null;
      this.fileSrc = require("@/static/icons/image-default.png");
      this.imageIsUploaded = false;
      this.pathToImage = null;
      this.$emit("imageDeleted");
    },
  },
  created() {
    if (this.path) {
      const { SERVER_URL } = process.env;
      // this.fileSrc = "data:image/png;base64," + this.path;
      this.fileSrc = `${SERVER_URL}/` + this.path;
    }
    //   if (data.image !== null) {
    //     return `${SERVER_URL}/${data.image.directoryCompressed}`;
    //   } else {
    //     return "/admin/user.png";
    //   }
  },
};
</script>

<style lang="scss">
.file_uploader_wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}
.clearButton {
  position: absolute;
  right: 3%;
  top: 3%;
  height: 18px;
  width: 18px;
  background-color: #f44270;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  transition: 0.2s;

  span {
    transition: 0.2s;
    font-size: 12px;
    color: #ffffff;
    // margin: 1px 0px 0px 0px;
  }
  &:hover {
    transform: scale(1.09);
    span {
      transform: scale(1.09);
    }
    -webkit-box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.6);
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.6);
  }
  &:active {
    transform: scale(0.99);
    span {
      transform: scale(0.99);
    }
  }
}
.image_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  background-color: #ffffff;
  overflow: hidden;
  transition: 0.4s;
  &:hover {
    background-color: rgba($color: $main-link-color, $alpha: 0.2);
    img {
      transform: scale(0.99);
    }
  }
}
.image {
  transition: 0.4s;
  max-height: 90%;
  border-radius: 10px;
}
.user-info-avatar {
  margin: 0;
}
.custom_file_uploader_for_employee {
  width: 1px;
  height: 1px;
  position: absolute;
  z-index: -1;
}
</style>
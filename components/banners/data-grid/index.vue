<template>
  <div>
    <DxDataGrid
      :data-source="bannersDataSource"
      :show-borders="true"
      :remote-operations="true"
      :hover-state-enabled="true"
      :row-alternatin-enabled="false"
      :allow-column-reordering="true"
      :column-auto-width="true"
      height="82vh"
      width="100%"
      @row-updating="rowUpdating"
      @toolbar-preparing="toolbarPreparing"
    >
      <!-- <DxSearchPanel position="after" :visible="true" placeholder="Поиск..." /> -->
      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="bannersdatagrid"
      />
      <DxEditing
        :allow-updating="true"
        :allow-deleting="true"
        :useIcons="true"
        mode="form"
      />
      <DxPaging :page-size="10" />
      <DxScrolling mode="virtual" row-rendering-mode="virtual" />

      <DxColumn
        :caption="$t('banners.createBanner.banner')"
        data-field="image"
        width="340"
        cell-template="bannerImage"
        :allow-sorting="false"
        :allow-filtering="false"
      />
      <DxColumn data-field="bannerType" :caption="$t('banners.typeOfBanner')">
        <DxLookup
          value-expr="id"
          display-expr="name"
          :data-source="bannerTypeDataSource"
        />
      </DxColumn>

      <DxColumn :width="100" :buttons="editButtons" type="buttons" />

      <template #toolbar>
        <BaseToolbar :pageTitle="gridTitle" @onCreate="create" />
      </template>
      <template #bannerImage="{ data }">
        <div
          class="banner-photo-wrapper"
          :style="`background: url('${getImage(data)}') center no-repeat`"
        >
          <!-- <img class="banner-photo" :src="getImage(data)" /> -->
        </div>
      </template>
    </DxDataGrid>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxPaging,
  DxLookup,
  DxScrolling,
  DxStateStoring,
  DxSearchPanel,
} from "devextreme-vue/data-grid";
import DataSource from "devextreme/data/data_source";
import { DxButton } from "devextreme-vue/button";

import { BannerTypes } from "../../../infrastructure/data-sources/BannerTypes";

import BaseToolbar from "../../pages-components/base-toolbar.vue";

export default Vue.extend({
  components: {
    DxButton,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxPaging,
    DxLookup,
    DxScrolling,
    DxStateStoring,
    DxSearchPanel,
    BaseToolbar,
  },
  data() {
    return {
      bannersDataSource: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.$dataApi.banner,
          removeUrl: this.$dataApi.banner,
        }),
      }),
      bannerTypeDataSource: BannerTypes(this),
    };
  },
  computed: {
    gridTitle() {
      let title: string = this.$t("pageHeader.pageTitles.banners");
      return title;
    },
    editButtons() {
      return [
        {
          icon: "edit",
          onClick: (e) => {
            this.$router.push(`/admin/banners/${e.row.data.id}`);
          },
        },
        "delete",
      ];
    },
  },
  methods: {
    rowUpdating(e) {
      e.newData = Object.assign(e.oldData, e.newData);
    },
    toolbarPreparing(e) {
      e.toolbarOptions.items = [
        {
          template: "toolbar",
          location: "before",
        },
        ...e.toolbarOptions.items,
      ];
    },
    getImage({ data }) {
      const { SERVER_URL } = process.env;
      if (data.image !== null) {
        return `${SERVER_URL}/${data.image.directoryThumbnails}`;
      } else {
        return "/admin/banner.png";
      }
    },
    create() {
      this.$router.push("/admin/banners/create");
    },
  },
  mounted() {
    setTimeout(() => {
      this.bannersDataSource.reload();
    }, 1000);
  },
});
</script>

<style lang="scss">
.banner-photo-wrapper {
  width: 190px;
  height: 90px;
  border-radius: 10px;
  background-size: 100% !important;
}
</style>
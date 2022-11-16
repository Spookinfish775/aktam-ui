<template>
  <div>
    <DxTreeList
      height="82vh"
      parent-id-expr="parrentId"
      :root-value="nullableGUID"
      :data-source="dataSource"
      :show-borders="true"
      :hoverStateEnabled="true"
      :errorRowEnabled="false"
      :remote-operations="true"
      :column-auto-width="true"
      :load-panel="{
        enabled: true,
        indicatorSrc: require('~/static/icons/loading.gif'),
      }"
      :remoteOperations="{
        filtering: true,
        sorting: true,
        grouping: true,
      }"
      @toolbar-preparing="toolbarPreparing"
    >
      <DxSearchPanel position="after" :visible="true" placeholder="Поиск..." />
      <DxScrolling mode="virtual" />
      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="organization"
      />
      <DxEditing
        :allow-updating="true"
        :allow-deleting="true"
        :useIcons="true"
        mode="form"
      />

      <DxColumn
        data-field="photo"
        :caption="$t('categoriesPage.treeList.avatar')"
        width="120"
        cell-template="categoryPhoto"
        :allow-sorting="false"
        :allow-filtering="false"
      />
      <DxColumn
        data-field="nameRu"
        data-type="string"
        :caption="$t('categoriesPage.treeList.nameRu')"
      />

      <DxColumn
        data-field="nameEn"
        data-type="string"
        :caption="$t('categoriesPage.treeList.nameEn')"
      />
      <DxColumn
        data-field="nameTm"
        data-type="string"
        :caption="$t('categoriesPage.treeList.nameTm')"
      />

      <DxColumn :width="100" :buttons="editButtons" type="buttons" />

      <template #toolbar>
        <BaseToolbar :pageTitle="treeTitle" @onCreate="create" />
      </template>
      <template #categoryPhoto="{ data }">
        <img class="category-photo" :src="getImage(data)" alt="" />
      </template>
    </DxTreeList>
    <BasePopup
      ref="create-popup"
      width="80vw"
      :showTitle="true"
      :title="$t('categoriesPage.card.cardTitle')"
      :shading="true"
    >
      <CategoryCreate @successedSaved="successedSavedCategory" />
    </BasePopup>
    <BasePopup
      ref="update-popup"
      width="80vw"
      height="80vh"
      :showTitle="true"
      :title="$t('categoriesPage.card.updateTitle')"
      :shading="true"
    >
      <CategoryUpdate
        :categoryData="currentData"
        @successedUpdated="successedUpdatedCategory"
      />
    </BasePopup>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import {
  DxTreeList,
  DxColumn,
  DxFilterRow,
  DxEditing,
  DxColumnChooser,
  DxHeaderFilter,
  DxSearchPanel,
  DxSelection,
  DxLookup,
  DxScrolling,
  DxRequiredRule,
  DxStateStoring,
  DxColumnFixing,
} from "devextreme-vue/tree-list";
import DataSource from "devextreme/data/data_source";

import { nullableGUID } from "../../../../nullableGUID";

import BaseToolbar from "../../../pages-components/base-toolbar.vue";
import BasePopup from "../../../../components/global-components/popup.vue";
import CategoryCreate from "../card/category-create.vue";
import CategoryUpdate from "../card/category-card.vue";

export default Vue.extend({
  components: {
    DxSearchPanel,
    DxTreeList,
    DxColumn,
    DxEditing,
    DxHeaderFilter,
    DxScrolling,
    DxLookup,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxRequiredRule,
    DxStateStoring,
    DxSelection,
    BaseToolbar,
    BasePopup,
    CategoryCreate,
    CategoryUpdate,
  },
  data() {
    return {
      nullableGUID,
      dataSource: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.$dataApi.category,
          removeUrl: this.$dataApi.category,
        }),
      }),
      currentData: null,
      //   regionDataSource: this.$dxStore({
      //     key: "id",
      //     loadUrl: this.$dataApi.region,
      //   }),
    };
  },
  computed: {
    treeTitle() {
      let title: string = this.$t("pageHeader.pageTitles.categories");
      return title;
    },
    editButtons() {
      return [
        {
          icon: "edit",
          onClick: (e) => {
            this.currentData = e.row.data;

            this.$refs["update-popup"].open();
          },
        },
        "delete",
      ];
    },
  },
  methods: {
    create() {
      this.$refs["create-popup"].open();
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
        return `${SERVER_URL}/${data.image.directoryCompressed}`;
      } else {
        return;
      }
    },
    successedSavedCategory() {
      this.$refs["create-popup"].close();
      setTimeout(() => {
        this.dataSource.reload();
      }, 300);
    },
    successedUpdatedCategory() {
      this.$refs["update-popup"].close();
      setTimeout(() => {
        this.dataSource.reload();
      }, 1000);
    },
  },
});
</script>

<style lang="scss">
.dx-treelist-cell-expandable {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
.category-photo {
  border-radius: 100%;
  width: 60px;
  margin-bottom: 10px;
}
// .dx-treelist-cell-expandable {
//   padding: 0px !important;
// }
.dx-treelist-cell-expandable {
  margin-bottom: -1px;
}
</style>
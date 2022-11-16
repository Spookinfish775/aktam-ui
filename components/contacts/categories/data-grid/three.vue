<template>
  <div class="contacts-three-list">
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
        storage-key="contacts-categories-list"
      />
      <DxEditing
        :allow-updating="true"
        :allow-deleting="true"
        :useIcons="true"
        mode="form"
      />

      <DxColumn
        data-field="nameRu"
        data-type="string"
        :caption="$t('contacts.category.dataGrid.nameRu')"
      />
      <DxColumn
        data-field="nameEn"
        data-type="string"
        :caption="$t('contacts.category.dataGrid.nameEn')"
      />
      <DxColumn
        data-field="nameTm"
        data-type="string"
        :caption="$t('contacts.category.dataGrid.nameTm')"
      />

      <DxColumn :width="100" :buttons="editButtons" type="buttons" />

      <template #toolbar>
        <BaseToolbar :pageTitle="treeTitle" @onCreate="create" />
      </template>
    </DxTreeList>
    <BasePopup
      ref="create-popup"
      width="80vw"
      :showTitle="true"
      :title="$t('contacts.category.card.cardTitle')"
      :shading="true"
    >
      <CategoryCreate @successedSaved="successedSavedCategory" />
    </BasePopup>
    <BasePopup
      ref="update-popup"
      width="80vw"
      height="80vh"
      :showTitle="true"
      :title="$t('contacts.category.card.updateTitle')"
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

import BaseToolbar from "../../../../components/pages-components/base-toolbar.vue";
import BasePopup from "../../../../components/global-components/popup.vue";
import CategoryCreate from "../../../../components/contacts/categories/card/category-create.vue";
import CategoryUpdate from "../../../../components/contacts/categories/card/category-card.vue";

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
          loadUrl: this.$dataApi.contactCategory,
          removeUrl: this.$dataApi.contactCategory,
        }),
      }),
      currentData: null,
    };
  },
  computed: {
    treeTitle() {
      let title: string = this.$t("pageHeader.pageTitles.contactsCategory");
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
.contacts-three-list {
  .my-page-title {
    width: 300px;
  }
}
</style>
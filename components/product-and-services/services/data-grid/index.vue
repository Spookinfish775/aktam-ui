<template>
  <div>
    <DxDataGrid
      :data-source="servicesDataSource"
      :show-borders="true"
      :remote-operations="true"
      :hover-state-enabled="true"
      :row-alternatin-enabled="false"
      :allow-column-reordering="true"
      :column-auto-width="true"
      height="82vh"
      @row-updating="rowUpdating"
      @toolbar-preparing="toolbarPreparing"
    >
      <DxSearchPanel position="after" :visible="true" placeholder="Поиск..." />
      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="servicesdatagrid"
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
        :caption="$t('products.servicesDataGrid.serviceImage')"
        data-field="images"
        width="100"
        cell-template="productPhoto"
        :allow-sorting="false"
        :allow-filtering="false"
      />
      <DxColumn
        data-field="nameRu"
        width="300"
        :caption="$t('products.servicesDataGrid.serviceName')"
      />
      <DxColumn
        data-field="categories"
        cell-template="categoryTemplate"
        :allow-sorting="false"
        :allow-filtering="false"
        :caption="$t('products.productDataGrid.productCategory')"
      />
      <DxColumn
        data-field="shop.nameRu"
        :caption="$t('products.servicesDataGrid.serviceShop')"
      />

      <DxColumn :width="100" :buttons="editButtons" type="buttons" />

      <template #toolbar>
        <BaseToolbar :pageTitle="gridTitle" @onCreate="create" />
      </template>
      <template #productPhoto="{ data }">
        <img class="service-photo" :src="getImage(data)" />
      </template>
      <template #categoryTemplate="{ data }">
        <CategoryTemplate :categoryData="data.data.categories" />
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
  DxScrolling,
  DxStateStoring,
  DxSearchPanel,
} from "devextreme-vue/data-grid";
import DataSource from "devextreme/data/data_source";
import { DxButton } from "devextreme-vue/button";

import BaseToolbar from "../../../pages-components/base-toolbar.vue";
import CategoryTemplate from "../../../../components/pages-components/common/categories-template.vue";

export default Vue.extend({
  components: {
    DxButton,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxPaging,
    DxScrolling,
    DxStateStoring,
    DxSearchPanel,
    BaseToolbar,
    CategoryTemplate,
  },
  data() {
    return {
      servicesDataSource: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.$dataApi.storeService,
          removeUrl: this.$dataApi.storeService,
        }),
        // filter: ["isMain", "=", true],
      }),
      autoExpandAll: true,
    };
  },
  computed: {
    gridTitle() {
      let title: string = this.$t("pageHeader.pageTitles.services");
      return title;
    },
    editButtons() {
      return [
        {
          icon: "edit",
          onClick: (e) => {
            this.$router.push(
              `/admin/products-and-services/services/${e.row.data.slug}`
            );
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
        return `${SERVER_URL}/${data.image.directoryCompressed}`;
      } else {
        return "/admin/service.png";
      }
    },
    create() {
      this.$router.push("/admin/products-and-services/services/create");
    },
  },
  mounted() {
    setTimeout(() => {
      this.servicesDataSource.reload();
    }, 1000);
  },
});
</script>

<style lang="scss">
.service-photo {
  border-radius: 100%;
  width: 60px;
}
</style>
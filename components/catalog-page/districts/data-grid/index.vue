<template>
  <div>
    <DxDataGrid
      :data-source="districtsDataSource"
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
      <DxSearchPanel
        position="after"
        :visible="true"
        place
        placeholder="Поиск..."
      />
      <DxStateStoring
        :enabled="true"
        type="localStorage"
        storage-key="districtsdatagrid"
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
        data-field="nameRu"
        data-type="string"
        :caption="$t('counriesAndCitiesCards.district.nameRu')"
      />
      <DxColumn
        data-field="nameEn"
        data-type="string"
        :caption="$t('counriesAndCitiesCards.district.nameEn')"
      />
      <DxColumn
        data-field="nameTm"
        data-type="string"
        :caption="$t('counriesAndCitiesCards.district.nameTm')"
      />
      <DxColumn
        data-field="country.nameRu"
        data-type="string"
        :caption="$t('counriesAndCitiesCards.district.parrentCountry')"
      />

      <DxColumn :width="100" :buttons="editButtons" type="buttons" />
      <template #toolbar>
        <BaseToolbar :pageTitle="gridTitle" @onCreate="create" />
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
import Notification from "../../../global-components/notification.vue";

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
    Notification,
  },
  data() {
    return {
      districtsDataSource: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.$dataApi.district,
          removeUrl: this.$dataApi.district,
        }),
      }),
      autoExpandAll: true,
    };
  },
  computed: {
    gridTitle() {
      let title: string = this.$t("pageHeader.pageTitles.districts");
      return title;
    },
    editButtons() {
      return [
        {
          icon: "edit",
          onClick: (e) => {
            this.$router.push(`/admin/catalogs/districts/${e.row.data.id}`);
          },
        },
        "delete",
      ];
    },
  },
  methods: {
    create() {
      this.$router.push("/admin/catalogs/districts/create");
    },
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
  },
});
</script>

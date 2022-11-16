<template>
  <div>
    <DxDataGrid
      :data-source="citiesDataSource"
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
        storage-key="citiesdatagrid"
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
        :caption="$t('counriesAndCitiesCards.city.nameRu')"
      />
      <DxColumn
        data-field="nameEn"
        data-type="string"
        :caption="$t('counriesAndCitiesCards.city.nameEn')"
      />
      <DxColumn
        data-field="nameTm"
        data-type="string"
        :caption="$t('counriesAndCitiesCards.city.nameTm')"
      />
      <DxColumn
        data-field="district.nameRu"
        data-type="string"
        :caption="$t('counriesAndCitiesCards.city.parrentRegion')"
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
      citiesDataSource: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.$dataApi.city,
          removeUrl: this.$dataApi.city,
        }),
      }),
      autoExpandAll: true,
    };
  },
  computed: {
    gridTitle() {
      let title: string = this.$t("pageHeader.pageTitles.cities");
      return title;
    },
    editButtons() {
      return [
        {
          icon: "edit",
          onClick: (e) => {
            this.$router.push(`/admin/catalogs/cities/${e.row.data.id}`);
          },
        },
        "delete",
      ];
    },
  },
  methods: {
    create() {
      this.$router.push("/admin/catalogs/cities/create");
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

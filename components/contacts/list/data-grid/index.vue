<template>
  <div class="contacts-data-grid">
    <DxDataGrid
      :data-source="contactsDataSource"
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
        storage-key="productsdatagrid"
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
        data-field="image"
        width="100"
        cell-template="contactPhoto"
        :caption="$t('contacts.contact.dataGrid.photo')"
        :allow-sorting="false"
        :allow-filtering="false"
      />
      <DxColumn
        data-field="nameRu"
        :caption="$t('contacts.contact.dataGrid.name')"
      />
      <DxColumn
        data-field="email"
        :caption="$t('contacts.contact.dataGrid.email')"
      />
      <DxColumn
        data-field="phoneNumbers"
        cell-template="numberTemplate"
        :caption="$t('contacts.contact.dataGrid.phoneNumbers')"
        :allow-sorting="false"
        :allow-filtering="false"
      />

      <DxColumn :width="100" :buttons="editButtons" type="buttons" />

      <template #toolbar>
        <BaseToolbar :pageTitle="gridTitle" @onCreate="create" />
      </template>
      <template #contactPhoto="{ data }">
        <img class="contact-photo" :src="getImage(data)" alt="contactPhoto" />
      </template>
      <template #numberTemplate="{ data }">
        <PhoneNumberTemplate :phoneData="data.data.phoneNumbers" />
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
import { ShopPhotoType } from "~/infrastructure/enums/ShopPhotoType";

import BaseToolbar from "../../../../components/pages-components/base-toolbar.vue";
import PhoneNumberTemplate from "../../../../components/pages-components/common/phone-number-template.vue";

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
    PhoneNumberTemplate,
  },
  data() {
    return {
      contactsDataSource: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.$dataApi.contact,
          removeUrl: this.$dataApi.contact,
        }),
      }),
      autoExpandAll: true,
    };
  },
  computed: {
    gridTitle() {
      let title: string = this.$t("pageHeader.pageTitles.contactsList");
      return title;
    },
    editButtons() {
      return [
        {
          icon: "edit",
          onClick: (e) => {
            this.$router.push(`/admin/contacts/list/${e.row.data.id}`);
          },
        },
        "delete",
      ];
    },
  },
  methods: {
    create() {
      this.$router.push("/admin/contacts/list/create");
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
    getImage({ data }) {
      const { SERVER_URL } = process.env;

      let result = data.image.find(
        (item) => item.shopPhotoType == ShopPhotoType.ContactBanner
      );

      if (result !== undefined) {
        return `${SERVER_URL}/${result.directoryThumbnails}`;
      } else {
        return "/admin/contact.png";
      }
    },
  },
});
</script>

<style lang="scss">
.contacts-data-grid {
  .my-page-title {
    width: 300px;
  }
}
.contact-photo {
  border-radius: 100%;
  width: 60px;
}
</style>
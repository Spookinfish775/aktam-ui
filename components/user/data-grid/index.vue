<template>
  <div>
    <DxDataGrid
      :data-source="usersDataSource"
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
        storage-key="userdatagrid"
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
        :caption="$t('userPage.dataGrid.avatar')"
        data-field="image"
        width="100"
        cell-template="userAvatar"
        :allow-sorting="false"
        :allow-filtering="false"
      />
      <DxColumn
        :show-borders="false"
        :caption="$t('userPage.dataGrid.fullName.title')"
      >
        <DxColumn
          data-field="firstName"
          :caption="$t('userPage.dataGrid.fullName.name')"
        />
        <DxColumn
          data-field="lastName"
          :caption="$t('userPage.dataGrid.fullName.lastName')"
        />
      </DxColumn>
      <DxColumn
        data-field="phoneNumbers"
        cell-template="numberTemplate"
        :allow-sorting="false"
        :allow-filtering="false"
        :caption="$t('userPage.dataGrid.phoneNumbers')"
      />
      <DxColumn :caption="$t('userPage.dataGrid.address.title')">
        <DxColumn
          data-field="country.nameRu"
          :caption="$t('userPage.dataGrid.address.country')"
        />
        <DxColumn
          data-field="city.nameRu"
          :caption="$t('userPage.dataGrid.address.city')"
        />
      </DxColumn>
      <DxColumn :width="100" :buttons="editButtons" type="buttons" />
      <template #toolbar>
        <BaseToolbar :pageTitle="gridTitle" @onCreate="create" />
      </template>
      <template #numberTemplate="{ data }">
        <UserListItemPhoneNumber :phoneData="data.data.phoneNumbers" />
      </template>
      <template #userAvatar="{ data }">
        <img class="user-avatar" :src="getImage(data)" alt="" />
      </template>
    </DxDataGrid>
    <BasePopup
      ref="create-popup"
      width="80vw"
      height="80vh"
      :showTitle="true"
      :title="$t('userPage.userCard.cardTitele')"
      :shading="true"
    >
      <UserCreate @successedSaved="successedSavedUser" />
    </BasePopup>
    <BasePopup
      ref="update-popup"
      width="80vw"
      height="80vh"
      :showTitle="true"
      :title="$t('userPage.userCard.updateTitle')"
      :shading="true"
    >
      <UserCard
        :userData="currentData"
        @successedUpdated="successedUpdatedUser"
      />
    </BasePopup>
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

import BaseToolbar from "../../pages-components/base-toolbar.vue";
import BasePopup from "../../global-components/popup.vue";
import UserCreate from "../card/user-create.vue";
import UserCard from "../card/user-card.vue";
import UserListItemPhoneNumber from "../../../components/pages-components/common/phone-number-template.vue";
import Notification from "../../global-components/notification.vue";

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
    BasePopup,
    UserCreate,
    UserCard,
    UserListItemPhoneNumber,
    Notification,
  },
  data() {
    return {
      usersDataSource: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.$dataApi.users.userCRUD,
          removeUrl: this.$dataApi.users.userCRUD,
        }),
      }),
      autoExpandAll: true,
      currentData: null,
    };
  },
  computed: {
    gridTitle() {
      let title: string = this.$t("pageHeader.pageTitles.users");
      return title;
    },
    editButtons() {
      return [
        {
          icon: "edit",
          onClick: (e) => {
            // this.currentData = e.row.data;
            // this.currentData = this.getUser(e.row.data.id);
            this.getUser(e.row.data.id);
            // this.$refs["update-popup"].open();
          },
        },
        "delete",
      ];
    },
  },
  methods: {
    async getUser(id) {
      let response = await this.$axios.get(
        `${this.$dataApi.users.userCRUD}/${id}`
      );
      this.currentData = response.data;

      if (this.currentData) {
        this.$refs["update-popup"].open();
      } else {
        console.log("SOME ERROR");
      }
    },
    create() {
      this.$refs["create-popup"].open();
    },
    getImage({ data }) {
      const { SERVER_URL } = process.env;
      if (data.image !== null) {
        return `${SERVER_URL}/${data.image.directoryCompressed}`;
      } else {
        return "/admin/user.png";
      }
    },
    rowUpdating(e) {
      e.newData = Object.assign(e.oldData, e.newData);
    },

    successedSavedUser() {
      this.$refs["create-popup"].close();
      setTimeout(() => {
        this.usersDataSource.reload();
      }, 600);
    },
    successedUpdatedUser() {
      this.$refs["update-popup"].close();
      setTimeout(() => {
        this.usersDataSource.reload();
      }, 600);
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

<style lang="scss">
.user-avatar {
  border-radius: 100%;
  width: 60px;
}
</style>
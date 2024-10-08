<template lang="pug">
.connect-nav
  .left.d-flex.gap-8(v-if="!isMobile")
    LayoutHeaderSearch(v-if="!isMobile")
    ChainSelect
  .right
    .user-detail(v-if='user')
      .balance(@click='openInNewTab(monitorAccount(user.name))')
        span {{ systemBalance.split(' ')[0] | commaFloat }}
        span.balance-symbol {{ systemBalance.split(' ')[1] }}
      ElDropdown(@command="logout")
        .user-name(:class="{ viewOnly: user.viewOnly }")
          span {{ user.name }}
          i.el-icon-arrow-down.text-muted.ml-1
          .view-only-indicator(v-if="user.viewOnly") View-Only
        template(#dropdown)
          ElDropdownMenu
            ElDropdownItem(command="logout") {{ $t('Logout') }}
              //- .d-item(@click='logout')
    AlcorButton.connect-button(
      v-else,
      @click='$store.dispatch("chain/mainLogin")'
    )
      | {{ $t('Connect Wallet') }}

    AlcorButton.theme-toggle-button.desktop(
      v-if='$route.name != "index"',
      :icon-only-alt='true',
      @click='$store.dispatch("toggleTheme")'
    )
      i.el-icon-sunny(v-if='$colorMode.value == "dark"')
      i.el-icon-moon(v-else='')

    AlcorButton.theme-toggle-button.desktop.show-settings(
      :icon-only-alt='true',
      @click='showSetting = !showSetting'
    )
      i.el-icon-setting.show-settings

    settings.settings(v-if='showSetting', v-click-outside='onClickOutside')
    //el-dropdown
      div
        //AlcorButton(:iconOnlyAlt='true')
          i.el-icon-more
      //template(#dropdown='')
        el-dropdown-menu.dropdown-container
          a.d-item
            // <i class="el-icon-help"></i>
            | Help Center
          a.d-item Telegram
          a.d-item Twitter
          a.d-item
            // <i class="el-icon-document"></i>
            | Docs
          AlcorButton.theme-toggle-button.desktop(
            :iconOnlyAlt='true',
            @click='$store.dispatch("toggleTheme")'
          )
            i.el-icon-sunny(v-if='$colorMode.value == "dark"')
            i.el-icon-moon(v-else='')
    AlcorButton.theme-toggle-button.mobile(
      :iconOnlyAlt='true',
      @click='$store.dispatch("toggleTheme")'
    )
      i.el-icon-sunny(v-if='$colorMode.value == "dark"')
      i.el-icon-moon(v-else='')
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import AlcorButton from '@/components/AlcorButton'

import config from '~/config'
import Settings from '~/components/layout/Settings'
import ChainSelect from '~/components/elements/ChainSelect'
import LayoutHeaderSearch from '~/components/layout/LayoutHeaderSearch'

export default {
  components: {
    AlcorButton,
    Settings,
    ChainSelect,
    LayoutHeaderSearch,
    // AlcorLink
  },

  data() {
    return {
      loading: false,
      showSetting: false, //to show settings modal
    }
  },

  computed: {
    ...mapGetters(['user', 'systemBalance']),
    ...mapState(['network']),

    current_chain() {
      return this.$store.state.network
    },

    networks() {
      return Object.values(config.networks).filter((n) => ['eos', 'telos', 'wax', 'bos', 'proton'].includes(n.name))
    },
  },
  //   props: {
  //     isFooter: {
  //       default: false,
  //       type: Boolean
  //     }
  //   }
  methods: {
    async logout() {
      await this.$store.dispatch('chain/logout')
    },
    onClickOutside(event) {
      if (this.showSetting) {
        this.showSetting = false
      }
    },
    changeChain(chain) {
      // TODO Move to config: APP_DOMAIN
      const location = chain == 'wax' ? 'https://alcor.exchange/' : `https://${chain}.alcor.exchange/`

      this.loading = true
      window.location = location + window.location.pathname.split('/')[1] || ''
    },
  },
}
</script>

<style scoped lang="scss">
.connect-nav {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
}

.right {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  width: 100%;
}

.theme-toggle-button {
  border-radius: 50% !important;
  margin: 4px 0;
  color: var(--text-default) !important;

  &.mobile {
    display: none !important;
  }
}

.d-item {
  display: flex;
  text-align: center;
  padding: 4px 12px;
  min-width: 150px;
  color: var(--text-default);
  cursor: pointer;

  &:hover {
    background: var(--hover);
  }
}

.connect-button {
  margin: 0 4px;
  height: 32px;
  background: var(--btn-default);
  color: var(--text-default) !important;
}

.show-settings {
  background: var(--btn-default);
  color: var(--text-default) !important;
}

.user-detail {
  font-size: 14px;
  border-radius: var(--radius);
  background: var(--background-color-third);
  display: flex;
  align-items: center;
  padding: 2px;
}

.balance {
  padding: 4px;
  cursor: pointer;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  // font-size: 0.75rem;
  .balance-symbol {
    font-size: 12px;
    padding: 2px 4px;
    border-radius: var(--radius);
    background-color: var(--bg-alter-2);
  }
}

.user-name {
  padding: 4px 8px;
  font-size: 14px !important;
  background: var(--background-color-base);
  color: var(--text-default);
  border-radius: var(--radius);
  white-space: nowrap;
  position: relative;
  &.viewOnly {
    border-radius: 4px 4px 0 0;
  }
}
.view-only-indicator {
  position: absolute;
  top: 100%;
  right: 0;
  font-size: 10px;
  background: var(--main-action-green);
  color: black;
  min-width: 100%;
  text-align: center;
  border-radius: 0 0 4px 4px;
  font-weight: 500;
  padding: 0 2px;
}

.settings {
  position: absolute;
  top: 60px;
  right: 10px;
  background: var(--table-background);
  border: var(--border-2);
  border-radius: 2px;
  z-index: 9;
}

@media only screen and (max-width: 600px) {
  //.connect-nav {
  //  .left {
  //    margin-right: auto;
  //  }
  //}
  .connect-button {
    font-size: 0.8rem;
    padding: 4px 24px;
  }

  .network-selection {
    padding: 4px;

    span {
      font-size: 0.8rem;
    }

    i {
      font-size: 0.8rem;
    }
  }

  .theme-toggle-button {
    &.desktop {
      display: none !important;
    }

    &.mobile {
      display: block !important;
    }
  }
}
</style>

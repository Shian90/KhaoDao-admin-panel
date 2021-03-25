import { MenuItemType } from '@paljs/ui/types';

const items: MenuItemType[] = [
  {
    title: 'Home Page',
    icon: { name: 'home' },
    link: { href: '/dashboard' },
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Admin',
    icon: { name: 'star-outline' },
    children: [
      {
        title: 'Zones',
        children: [
          {
            title: 'View All Zones',
            link: {
              href: '/admin/zones/getAllZones',
            },
          },
          {
            title: 'Create a new Zone',
            link: {
              href: '/admin/zones/createZone',
            },
          },
          {
            title: 'Update a zone',
            link: {
              href: '/admin/zones/updateZone',
            },
          },
          {
            title: 'Delete a zone',
            link: {
              href: '/admin/zones/deleteZone',
            },
          },
        ],
      },
      {
        title: 'Merchants',
        children: [
          {
            title: 'View All Merchants',
            link: {
              href: '/admin/merchants/viewAllMerchants',
            },
          },
          {
            title: 'Create a new Merchant',
            link: {
              href: '/admin/merchants/createMerchant',
            },
          },
          {
            title: 'Update a Merchant',
            link: {
              href: '/admin/merchants/updateMerchant',
            },
          },
          {
            title: 'Delete a Merchant',
            link: {
              href: '/admin/merchants/deleteMerchant',
            },
          },
        ],
      },
      {
        title: 'Shop Tags',
        children: [
          {
            title: 'View All Shop Tags',
            link: {
              href: '/admin/shop_tags/viewAllShopTags',
            },
          },
          {
            title: 'Create a new Tag',
            link: {
              href: '/admin/shop_tags/createShopTag',
            },
          },
          {
            title: 'Update a Tag',
            link: {
              href: '/admin/shop_tags/updateShopTag',
            },
          },
          {
            title: 'Delete a Tag',
            link: {
              href: '/admin/shop_tags/deleteShopTag',
            },
          },
          {
            title: 'View Shop tag assignments',
            link: {
              href: '/admin/shop_tags/viewAllShopAssignments',
            },
          },
          {
            title: 'Assign tag to shop',
            link: {
              href: '/admin/shop_tags/assignShopTagsToShop',
            },
          },
          {
            title: 'Remove Tag from Shop',
            link: {
              href: '/admin/shop_tags/removeAssignmentFromShop',
            },
          },
        ],
      },
      {
        title: 'Leads',
        children: [
          {
            title: 'View All Merchant Leads',
            link: {
              href: '/admin/leads/getAllMerchantLeads',
            },
          },
          {
            title: 'Edit Merchant Lead Status',
            link: {
              href: '/admin/leads/editMerchantLeadStatus',
            },
          },
          {
            title: 'View All Rider leads',
            link: {
              href: '/admin/leads/getAllRiderLeads',
            },
          },
          {
            title: 'Edit Rider lead status',
            link: {
              href: '/admin/leads/editRiderLeadStatus',
            },
          },
        ],
      },

      // {
      //   title: 'Post Requests',
      //   link: {href: '/extra-components/accordion' },
      // },
    ],
  },
  // {
  //   title: 'Extra Components',
  //   icon: { name: 'star-outline' },
  //   children: [
  //     {
  //       title: 'Accordion',
  //       link: { href: '/extra-components/accordion' },
  //     },
  //     {
  //       title: 'My Accordion',
  //       link: { href: '/extra-components/accordion' },
  //     },
  //     {
  //       title: 'Actions',
  //       link: { href: '/extra-components/actions' },
  //     },
  //     {
  //       title: 'Alert',
  //       link: { href: '/extra-components/alert' },
  //     },
  //     {
  //       title: 'List',
  //       link: { href: '/extra-components/list' },
  //     },
  //     {
  //       title: 'Spinner',
  //       link: { href: '/extra-components/spinner' },
  //     },
  //     {
  //       title: 'Progress Bar',
  //       link: { href: '/extra-components/progress' },
  //     },
  //     {
  //       title: 'Tabs',
  //       link: { href: '/extra-components/tabs' },
  //     },
  //     {
  //       title: 'Chat',
  //       link: { href: '/extra-components/chat' },
  //     },
  //     {
  //       title: 'Cards',
  //       link: { href: '/extra-components/cards' },
  //     },
  //     {
  //       title: 'Flip Card',
  //       link: { href: '/extra-components/flip-card' },
  //     },
  //     {
  //       title: 'Reveal Card',
  //       link: { href: '/extra-components/reveal-card' },
  //     },
  //   ],
  // },
  // {
  //   title: 'Forms',
  //   icon: { name: 'edit-2-outline' },
  //   children: [
  //     {
  //       title: 'Inputs',
  //       link: { href: '/forms/inputs' },
  //     },
  //     {
  //       title: 'Layout',
  //       link: { href: '/forms/form-layout' },
  //     },
  //     {
  //       title: 'Buttons',
  //       link: { href: '/forms/buttons' },
  //     },
  //     {
  //       title: 'Select',
  //       link: { href: '/forms/select' },
  //     },
  //   ],
  // },
  // {
  //   title: 'UI Features',
  //   icon: { name: 'keypad-outline' },
  //   children: [
  //     {
  //       title: 'Grid',
  //       link: { href: '/ui-features/grid' },
  //     },
  //     {
  //       title: 'Animated Searches',
  //       link: { href: '/ui-features/search' },
  //     },
  //   ],
  // },
  // {
  //   title: 'Modal & Overlays',
  //   icon: { name: 'browser-outline' },
  //   children: [
  //     {
  //       title: 'Popover',
  //       link: { href: '/modal-overlays/popover' },
  //     },
  //     {
  //       title: 'Tooltip',
  //       link: { href: '/modal-overlays/tooltip' },
  //     },
  //     {
  //       title: 'Toastr',
  //       link: { href: '/modal-overlays/toastr' },
  //     },
  //   ],
  // },
  // {
  //   title: 'Editors',
  //   icon: { name: 'text-outline' },
  //   children: [
  //     {
  //       title: 'TinyMCE',
  //       link: { href: '/editors/tinymce' },
  //     },
  //     {
  //       title: 'CKEditor',
  //       link: { href: '/editors/ckeditor' },
  //     },
  //   ],
  // },
  // {
  //   title: 'Miscellaneous',
  //   icon: { name: 'shuffle-2-outline' },
  //   children: [
  //     {
  //       title: '404',
  //       link: { href: '/miscellaneous/404' },
  //     },
  //   ],
  // },
  // {
  //   title: 'Auth',
  //   icon: { name: 'lock-outline' },
  //   children: [
  //     {
  //       title: 'Login',
  //       link: { href: '/auth/login' },
  //     },
  //     {
  //       title: 'Register',
  //       link: { href: '/auth/register' },
  //     },
  //     {
  //       title: 'Request Password',
  //       link: { href: '/auth/request-password' },
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: { href: '/auth/reset-password' },
  //     },
  //   ],
  // },
];

export default items;

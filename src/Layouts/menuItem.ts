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
  {
    title: 'Restaurant',
    icon: { name: 'lock-outline' },
    children: [
      {
        title: 'Add New Restaurant',
        link: { href: '/restaurant/addNewRestaurant' },
      },
      {
        title: 'Get All Restaurant',
        link: { href: '/restaurant/getAllRestaurants' },
      },
      {
        title: 'Update Restaurant',
        link: { href: '/restaurant/updateRestaurant' },
      },
    ],
  },
  {
    title: 'Menu',
    icon: { name: 'lock-outline' },
    children: [
      {
        title: 'Add New Menu',
        link: { href: '/menu/addMenu' },
      },
      {
        title: 'Get All Menu',
        link: { href: '/menu/getAllMenus' },
      },
      {
        title: 'Update Menu',
        link: { href: '/menu/updateMenu' },
      },
    ],
  },

  {
    title: 'Items',
    icon: { name: 'lock-outline' },
    children: [
      {
        title: 'Add New Item',
        link: { href: '/items/addNewItem' },
      },
      {
        title: 'Get All Items',
        link: { href: '/items/getAllItems' },
      },
      {
        title: 'Update Item',
        link: { href: '/items/updateItem' },
      },
    ],
  },
];

export default items;

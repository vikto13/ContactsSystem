migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2023-02-20 09:47:22.917Z",
      "updated": "2023-06-06 05:21:51.458Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_name",
          "name": "name",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "kssxpcoc",
          "name": "permissions_id",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "adadquft6s38bg8",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "users_avatar",
          "name": "avatar",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif",
              "image/webp"
            ],
            "thumbs": null,
            "protected": false
          }
        }
      ],
      "indexes": [
        "CREATE INDEX `__pb_users_auth__created_idx` ON `users` (`created`)"
      ],
      "listRule": "@request.auth.id != \"\" && @request.auth.username = \"admin\"",
      "viewRule": "@request.auth.id != \"\" && @request.auth.username = \"admin\"",
      "createRule": "@request.auth.id != \"\" && @request.auth.username = \"admin\"",
      "updateRule": "@request.auth.id != \"\" && @request.auth.username = \"admin\"",
      "deleteRule": "@request.auth.id != \"\" && @request.auth.username = \"admin\"",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": false,
        "allowUsernameAuth": false,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "requireEmail": false
      }
    },
    {
      "id": "sgv7cbhlqq9svxa",
      "created": "2023-02-20 09:49:13.646Z",
      "updated": "2023-06-06 05:21:51.459Z",
      "name": "offices",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "z07jaw8e",
          "name": "name",
          "type": "text",
          "required": false,
          "unique": true,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "cwvjd0ja",
          "name": "street",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "fa54fvwf",
          "name": "street_number",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "adfjz0kr",
          "name": "city",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "iwmqkayb",
          "name": "country",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "indexes": [
        "CREATE INDEX `_sgv7cbhlqq9svxa_created_idx` ON `offices` (`created`)",
        "CREATE UNIQUE INDEX \"idx_unique_z07jaw8e\" on \"offices\" (\"name\")"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_offices = true",
      "updateRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_offices = true",
      "deleteRule": "@request.auth.id != \"\" && @request.auth.permissions_id.delete_offices = true",
      "options": {}
    },
    {
      "id": "bakpn5k6ntn68n3",
      "created": "2023-02-20 09:49:13.646Z",
      "updated": "2023-06-06 05:21:51.460Z",
      "name": "divisions",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "hj7brm5w",
          "name": "name",
          "type": "text",
          "required": true,
          "unique": true,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "indexes": [
        "CREATE INDEX `_bakpn5k6ntn68n3_created_idx` ON `divisions` (`created`)",
        "CREATE UNIQUE INDEX \"idx_unique_hj7brm5w\" on \"divisions\" (\"name\")"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_structure = true",
      "updateRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_structure = true",
      "deleteRule": "@request.auth.id != \"\" && @request.auth.permissions_id.delete_structure = true",
      "options": {}
    },
    {
      "id": "bthy7mqw35rkvvb",
      "created": "2023-02-20 09:49:13.646Z",
      "updated": "2023-06-06 05:21:51.460Z",
      "name": "departments",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "xejrfy93",
          "name": "name",
          "type": "text",
          "required": true,
          "unique": true,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "indexes": [
        "CREATE INDEX `_bthy7mqw35rkvvb_created_idx` ON `departments` (`created`)",
        "CREATE UNIQUE INDEX \"idx_unique_xejrfy93\" on \"departments\" (\"name\")"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_structure = true",
      "updateRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_structure = true",
      "deleteRule": "@request.auth.id != \"\" && @request.auth.permissions_id.delete_structure = true",
      "options": {}
    },
    {
      "id": "57faccb7837p3uh",
      "created": "2023-02-20 09:49:13.646Z",
      "updated": "2023-06-06 05:21:51.461Z",
      "name": "groups",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "30ac1oen",
          "name": "name",
          "type": "text",
          "required": true,
          "unique": true,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "indexes": [
        "CREATE INDEX `_57faccb7837p3uh_created_idx` ON `groups` (`created`)",
        "CREATE UNIQUE INDEX \"idx_unique_30ac1oen\" on \"groups\" (\"name\")"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_structure = true",
      "updateRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_structure = true",
      "deleteRule": "@request.auth.id != \"\" && @request.auth.permissions_id.delete_structure = true",
      "options": {}
    },
    {
      "id": "b2oym7fr4tkhpsr",
      "created": "2023-02-20 09:49:13.647Z",
      "updated": "2023-06-06 05:21:51.462Z",
      "name": "employees",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "n6paumqi",
          "name": "name",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "6igwn0nm",
          "name": "surname",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "v0zylbie",
          "name": "email",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "f7oipevs",
          "name": "phone_number",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "4lb8gd9g",
          "name": "position",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "d51izihf",
          "name": "company_id",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "6pm3nos89zp7y7o",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "bcohrscv",
          "name": "office_id",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "sgv7cbhlqq9svxa",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": [
              "street",
              "street_number",
              "city",
              "country"
            ]
          }
        },
        {
          "system": false,
          "id": "8gx5okaz",
          "name": "division_id",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "bakpn5k6ntn68n3",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": [
              "name"
            ]
          }
        },
        {
          "system": false,
          "id": "izxwctfs",
          "name": "department_id",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "bthy7mqw35rkvvb",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": [
              "name"
            ]
          }
        },
        {
          "system": false,
          "id": "dpk8ajuv",
          "name": "group_id",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "57faccb7837p3uh",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "bnlikhc7",
          "name": "photo",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [
              "image/png",
              "image/jpeg",
              "image/svg+xml",
              "image/webp"
            ],
            "thumbs": [],
            "protected": false
          }
        }
      ],
      "indexes": [
        "CREATE INDEX `_b2oym7fr4tkhpsr_created_idx` ON `employees` (`created`)"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_employees = true",
      "updateRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_employees = true",
      "deleteRule": "@request.auth.id != \"\" && @request.auth.permissions_id.delete_employees = true",
      "options": {}
    },
    {
      "id": "adadquft6s38bg8",
      "created": "2023-02-20 09:49:13.647Z",
      "updated": "2023-06-06 05:21:51.463Z",
      "name": "user_permissions",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "vqhfdxwp",
          "name": "edit_employees",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "2a865yfa",
          "name": "delete_employees",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "eujhrmkk",
          "name": "edit_offices",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "nxkmmfta",
          "name": "delete_offices",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "m259ynsp",
          "name": "edit_structure",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "ops7pnpa",
          "name": "delete_structure",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "xac7kfle",
          "name": "read_permissions",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "jdvuer59",
          "name": "edit_permissions",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "wpmvxtdn",
          "name": "delete_permissions",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "rygzeuap",
          "name": "edit_companies",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "edhkghls",
          "name": "delete_companies",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        }
      ],
      "indexes": [
        "CREATE INDEX `_adadquft6s38bg8_created_idx` ON `user_permissions` (`created`)"
      ],
      "listRule": "@request.auth.id != \"\" && @request.auth.permissions_id.read_permissions = true",
      "viewRule": "@request.auth.id != \"\" && @request.auth.permissions_id.read_permissions = true",
      "createRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_permissions = true",
      "updateRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_permissions = true",
      "deleteRule": "@request.auth.id != \"\" && @request.auth.permissions_id.delete_permissions = true",
      "options": {}
    },
    {
      "id": "zzim4v132ojclwp",
      "created": "2023-02-20 10:06:06.660Z",
      "updated": "2023-06-06 05:21:51.463Z",
      "name": "offices_divisions",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "zt0q3os1",
          "name": "office_id",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "sgv7cbhlqq9svxa",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "8zvpbbjz",
          "name": "division_id",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "bakpn5k6ntn68n3",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        }
      ],
      "indexes": [
        "CREATE INDEX `_zzim4v132ojclwp_created_idx` ON `offices_divisions` (`created`)"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_structure = true",
      "updateRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_structure = true",
      "deleteRule": "@request.auth.id != \"\" && @request.auth.permissions_id.delete_structure = true",
      "options": {}
    },
    {
      "id": "6pm3nos89zp7y7o",
      "created": "2023-02-20 11:43:15.941Z",
      "updated": "2023-06-06 05:21:51.464Z",
      "name": "companies",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "0zy2rss8",
          "name": "name",
          "type": "text",
          "required": true,
          "unique": true,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "indexes": [
        "CREATE INDEX `_6pm3nos89zp7y7o_created_idx` ON `companies` (`created`)",
        "CREATE UNIQUE INDEX \"idx_unique_0zy2rss8\" on \"companies\" (\"name\")"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_companies = true",
      "updateRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_companies = true",
      "deleteRule": "@request.auth.id != \"\" && @request.auth.permissions_id.delete_companies = true",
      "options": {}
    },
    {
      "id": "69msfhns5ee63rg",
      "created": "2023-02-20 11:43:42.546Z",
      "updated": "2023-06-06 05:21:51.465Z",
      "name": "companies_offices",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "gbxyixur",
          "name": "company_id",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "6pm3nos89zp7y7o",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "4hep19qd",
          "name": "office_id",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "sgv7cbhlqq9svxa",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        }
      ],
      "indexes": [
        "CREATE INDEX `_69msfhns5ee63rg_created_idx` ON `companies_offices` (`created`)"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_offices = true",
      "updateRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_offices = true",
      "deleteRule": "@request.auth.id != \"\" && @request.auth.permissions_id.delete_offices = true",
      "options": {}
    },
    {
      "id": "ter9l3qqq9aqgj2",
      "created": "2023-02-20 12:02:24.476Z",
      "updated": "2023-06-06 05:21:51.465Z",
      "name": "divisions_departments",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "wvr0vqkr",
          "name": "division_id",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "bakpn5k6ntn68n3",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "xyoiqgwc",
          "name": "department_id",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "bthy7mqw35rkvvb",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        }
      ],
      "indexes": [
        "CREATE INDEX `_ter9l3qqq9aqgj2_created_idx` ON `divisions_departments` (`created`)"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_structure = true",
      "updateRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_structure = true",
      "deleteRule": "@request.auth.id != \"\" && @request.auth.permissions_id.delete_structure = true",
      "options": {}
    },
    {
      "id": "tc5kfi49ge03emy",
      "created": "2023-02-20 12:04:04.552Z",
      "updated": "2023-06-06 05:21:51.466Z",
      "name": "departments_groups",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "owmv7cob",
          "name": "department_id",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "bthy7mqw35rkvvb",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "iwyiuusm",
          "name": "group_id",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "57faccb7837p3uh",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        }
      ],
      "indexes": [
        "CREATE INDEX `_tc5kfi49ge03emy_created_idx` ON `departments_groups` (`created`)"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_structure = true",
      "updateRule": "@request.auth.id != \"\" && @request.auth.permissions_id.edit_structure = true",
      "deleteRule": "@request.auth.id != \"\" && @request.auth.permissions_id.delete_structure = true",
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})

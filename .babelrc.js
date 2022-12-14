/*
{
    "presets": [
      ["env", {
        "modules": false
      }],
      "react",
      "stage-2",
      "flow"
    ],
    "plugins": [
      "loadable-components/babel",
      "transform-regenerator",
      "transform-async-to-generator", [
        "import",
        {
          "libraryName": "antd",
          "style": true
        }
      ]
    ],
    "env": {
      "test": {
        "presets": [
          ["env", {
            "modules": "commonjs"
          }],
          "react",
          "stage-2",
          "flow",
          "jest"
        ],
        "plugins": [
          "loadable-components/babel",
          "transform-regenerator",
          "transform-async-to-generator"
        ]
      },
      "production": {
        "presets": [
          "react-optimize"
        ],
        "plugins": ["transform-remove-console"],
        "comments": false
      }
    }
  }
  */
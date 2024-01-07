import * as pulumi from "@pulumi/pulumi";
import * as azureNative from "@pulumi/azure-native";

const resourceGroup = new azureNative.resources.ResourceGroup("resourceGroup", {
    location: "WestUS",
    resourceGroupName: "myResourceGroup",
});

const storageAccount = new azureNative.storage.StorageAccount("storageAccount", {
    accountName: "mystorageaccountjitu",
    kind: "StorageV2",
    resourceGroupName: resourceGroup.name,
    sku: {
        name: "Standard_LRS",
    },
});

const storageTable = new azureNative.storage.Table("storageTable", {
    accountName: storageAccount.name,
    resourceGroupName: resourceGroup.name,
    tableName: "myStorageTable",
});

// Export the connection string for the storage account
export const connectionString = storageAccount.primaryEndpoints.apply(
    (primaryEndpoints) => `DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};EndpointSuffix=core.windows.net;`
);

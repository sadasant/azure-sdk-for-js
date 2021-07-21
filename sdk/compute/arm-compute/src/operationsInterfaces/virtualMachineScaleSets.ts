/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  VirtualMachineScaleSet,
  VirtualMachineScaleSetsListByLocationOptionalParams,
  VirtualMachineScaleSetsListOptionalParams,
  VirtualMachineScaleSetsListAllOptionalParams,
  VirtualMachineScaleSetSku,
  VirtualMachineScaleSetsListSkusOptionalParams,
  UpgradeOperationHistoricalStatusInfo,
  VirtualMachineScaleSetsGetOSUpgradeHistoryOptionalParams,
  VirtualMachineScaleSetsCreateOrUpdateOptionalParams,
  VirtualMachineScaleSetsCreateOrUpdateResponse,
  VirtualMachineScaleSetUpdate,
  VirtualMachineScaleSetsUpdateOptionalParams,
  VirtualMachineScaleSetsUpdateResponse,
  VirtualMachineScaleSetsDeleteOptionalParams,
  VirtualMachineScaleSetsGetOptionalParams,
  VirtualMachineScaleSetsGetResponse,
  VirtualMachineScaleSetsDeallocateOptionalParams,
  VirtualMachineScaleSetVMInstanceRequiredIDs,
  VirtualMachineScaleSetsDeleteInstancesOptionalParams,
  VirtualMachineScaleSetsGetInstanceViewOptionalParams,
  VirtualMachineScaleSetsGetInstanceViewResponse,
  VirtualMachineScaleSetsPowerOffOptionalParams,
  VirtualMachineScaleSetsRestartOptionalParams,
  VirtualMachineScaleSetsStartOptionalParams,
  VirtualMachineScaleSetsRedeployOptionalParams,
  VirtualMachineScaleSetsPerformMaintenanceOptionalParams,
  VirtualMachineScaleSetsUpdateInstancesOptionalParams,
  VirtualMachineScaleSetsReimageOptionalParams,
  VirtualMachineScaleSetsReimageAllOptionalParams,
  VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkOptionalParams,
  VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkResponse,
  VMScaleSetConvertToSinglePlacementGroupInput,
  VirtualMachineScaleSetsConvertToSinglePlacementGroupOptionalParams,
  OrchestrationServiceStateInput,
  VirtualMachineScaleSetsSetOrchestrationServiceStateOptionalParams
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a VirtualMachineScaleSets. */
export interface VirtualMachineScaleSets {
  /**
   * Gets all the VM scale sets under the specified subscription for the specified location.
   * @param location The location for which VM scale sets under the subscription are queried.
   * @param options The options parameters.
   */
  listByLocation(
    location: string,
    options?: VirtualMachineScaleSetsListByLocationOptionalParams
  ): PagedAsyncIterableIterator<VirtualMachineScaleSet>;
  /**
   * Gets a list of all VM scale sets under a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    options?: VirtualMachineScaleSetsListOptionalParams
  ): PagedAsyncIterableIterator<VirtualMachineScaleSet>;
  /**
   * Gets a list of all VM Scale Sets in the subscription, regardless of the associated resource group.
   * Use nextLink property in the response to get the next page of VM Scale Sets. Do this till nextLink
   * is null to fetch all the VM Scale Sets.
   * @param options The options parameters.
   */
  listAll(
    options?: VirtualMachineScaleSetsListAllOptionalParams
  ): PagedAsyncIterableIterator<VirtualMachineScaleSet>;
  /**
   * Gets a list of SKUs available for your VM scale set, including the minimum and maximum VM instances
   * allowed for each SKU.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  listSkus(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsListSkusOptionalParams
  ): PagedAsyncIterableIterator<VirtualMachineScaleSetSku>;
  /**
   * Gets list of OS upgrades on a VM scale set instance.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  listOSUpgradeHistory(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsGetOSUpgradeHistoryOptionalParams
  ): PagedAsyncIterableIterator<UpgradeOperationHistoricalStatusInfo>;
  /**
   * Create or update a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set to create or update.
   * @param parameters The scale set object.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: VirtualMachineScaleSet,
    options?: VirtualMachineScaleSetsCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<VirtualMachineScaleSetsCreateOrUpdateResponse>,
      VirtualMachineScaleSetsCreateOrUpdateResponse
    >
  >;
  /**
   * Create or update a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set to create or update.
   * @param parameters The scale set object.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: VirtualMachineScaleSet,
    options?: VirtualMachineScaleSetsCreateOrUpdateOptionalParams
  ): Promise<VirtualMachineScaleSetsCreateOrUpdateResponse>;
  /**
   * Update a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set to create or update.
   * @param parameters The scale set object.
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: VirtualMachineScaleSetUpdate,
    options?: VirtualMachineScaleSetsUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<VirtualMachineScaleSetsUpdateResponse>,
      VirtualMachineScaleSetsUpdateResponse
    >
  >;
  /**
   * Update a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set to create or update.
   * @param parameters The scale set object.
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: VirtualMachineScaleSetUpdate,
    options?: VirtualMachineScaleSetsUpdateOptionalParams
  ): Promise<VirtualMachineScaleSetsUpdateResponse>;
  /**
   * Deletes a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Deletes a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsDeleteOptionalParams
  ): Promise<void>;
  /**
   * Display information about a virtual machine scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsGetOptionalParams
  ): Promise<VirtualMachineScaleSetsGetResponse>;
  /**
   * Deallocates specific virtual machines in a VM scale set. Shuts down the virtual machines and
   * releases the compute resources. You are not billed for the compute resources that this virtual
   * machine scale set deallocates.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  beginDeallocate(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsDeallocateOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Deallocates specific virtual machines in a VM scale set. Shuts down the virtual machines and
   * releases the compute resources. You are not billed for the compute resources that this virtual
   * machine scale set deallocates.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  beginDeallocateAndWait(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsDeallocateOptionalParams
  ): Promise<void>;
  /**
   * Deletes virtual machines in a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param vmInstanceIDs A list of virtual machine instance IDs from the VM scale set.
   * @param options The options parameters.
   */
  beginDeleteInstances(
    resourceGroupName: string,
    vmScaleSetName: string,
    vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
    options?: VirtualMachineScaleSetsDeleteInstancesOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Deletes virtual machines in a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param vmInstanceIDs A list of virtual machine instance IDs from the VM scale set.
   * @param options The options parameters.
   */
  beginDeleteInstancesAndWait(
    resourceGroupName: string,
    vmScaleSetName: string,
    vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
    options?: VirtualMachineScaleSetsDeleteInstancesOptionalParams
  ): Promise<void>;
  /**
   * Gets the status of a VM scale set instance.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  getInstanceView(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsGetInstanceViewOptionalParams
  ): Promise<VirtualMachineScaleSetsGetInstanceViewResponse>;
  /**
   * Power off (stop) one or more virtual machines in a VM scale set. Note that resources are still
   * attached and you are getting charged for the resources. Instead, use deallocate to release resources
   * and avoid charges.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  beginPowerOff(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsPowerOffOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Power off (stop) one or more virtual machines in a VM scale set. Note that resources are still
   * attached and you are getting charged for the resources. Instead, use deallocate to release resources
   * and avoid charges.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  beginPowerOffAndWait(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsPowerOffOptionalParams
  ): Promise<void>;
  /**
   * Restarts one or more virtual machines in a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  beginRestart(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsRestartOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Restarts one or more virtual machines in a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  beginRestartAndWait(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsRestartOptionalParams
  ): Promise<void>;
  /**
   * Starts one or more virtual machines in a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  beginStart(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsStartOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Starts one or more virtual machines in a VM scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  beginStartAndWait(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsStartOptionalParams
  ): Promise<void>;
  /**
   * Shuts down all the virtual machines in the virtual machine scale set, moves them to a new node, and
   * powers them back on.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  beginRedeploy(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsRedeployOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Shuts down all the virtual machines in the virtual machine scale set, moves them to a new node, and
   * powers them back on.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  beginRedeployAndWait(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsRedeployOptionalParams
  ): Promise<void>;
  /**
   * Perform maintenance on one or more virtual machines in a VM scale set. Operation on instances which
   * are not eligible for perform maintenance will be failed. Please refer to best practices for more
   * details:
   * https://docs.microsoft.com/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-maintenance-notifications
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  beginPerformMaintenance(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsPerformMaintenanceOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Perform maintenance on one or more virtual machines in a VM scale set. Operation on instances which
   * are not eligible for perform maintenance will be failed. Please refer to best practices for more
   * details:
   * https://docs.microsoft.com/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-maintenance-notifications
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  beginPerformMaintenanceAndWait(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsPerformMaintenanceOptionalParams
  ): Promise<void>;
  /**
   * Upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param vmInstanceIDs A list of virtual machine instance IDs from the VM scale set.
   * @param options The options parameters.
   */
  beginUpdateInstances(
    resourceGroupName: string,
    vmScaleSetName: string,
    vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
    options?: VirtualMachineScaleSetsUpdateInstancesOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param vmInstanceIDs A list of virtual machine instance IDs from the VM scale set.
   * @param options The options parameters.
   */
  beginUpdateInstancesAndWait(
    resourceGroupName: string,
    vmScaleSetName: string,
    vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
    options?: VirtualMachineScaleSetsUpdateInstancesOptionalParams
  ): Promise<void>;
  /**
   * Reimages (upgrade the operating system) one or more virtual machines in a VM scale set which don't
   * have a ephemeral OS disk, for virtual machines who have a ephemeral OS disk the virtual machine is
   * reset to initial state.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  beginReimage(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsReimageOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Reimages (upgrade the operating system) one or more virtual machines in a VM scale set which don't
   * have a ephemeral OS disk, for virtual machines who have a ephemeral OS disk the virtual machine is
   * reset to initial state.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  beginReimageAndWait(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsReimageOptionalParams
  ): Promise<void>;
  /**
   * Reimages all the disks ( including data disks ) in the virtual machines in a VM scale set. This
   * operation is only supported for managed disks.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  beginReimageAll(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsReimageAllOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Reimages all the disks ( including data disks ) in the virtual machines in a VM scale set. This
   * operation is only supported for managed disks.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param options The options parameters.
   */
  beginReimageAllAndWait(
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetsReimageAllOptionalParams
  ): Promise<void>;
  /**
   * Manual platform update domain walk to update virtual machines in a service fabric virtual machine
   * scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param platformUpdateDomain The platform update domain for which a manual recovery walk is requested
   * @param options The options parameters.
   */
  forceRecoveryServiceFabricPlatformUpdateDomainWalk(
    resourceGroupName: string,
    vmScaleSetName: string,
    platformUpdateDomain: number,
    options?: VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkOptionalParams
  ): Promise<
    VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkResponse
  >;
  /**
   * Converts SinglePlacementGroup property to false for a existing virtual machine scale set.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the virtual machine scale set to create or update.
   * @param parameters The input object for ConvertToSinglePlacementGroup API.
   * @param options The options parameters.
   */
  convertToSinglePlacementGroup(
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: VMScaleSetConvertToSinglePlacementGroupInput,
    options?: VirtualMachineScaleSetsConvertToSinglePlacementGroupOptionalParams
  ): Promise<void>;
  /**
   * Changes ServiceState property for a given service
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the virtual machine scale set to create or update.
   * @param parameters The input object for SetOrchestrationServiceState API.
   * @param options The options parameters.
   */
  beginSetOrchestrationServiceState(
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: OrchestrationServiceStateInput,
    options?: VirtualMachineScaleSetsSetOrchestrationServiceStateOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Changes ServiceState property for a given service
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the virtual machine scale set to create or update.
   * @param parameters The input object for SetOrchestrationServiceState API.
   * @param options The options parameters.
   */
  beginSetOrchestrationServiceStateAndWait(
    resourceGroupName: string,
    vmScaleSetName: string,
    parameters: OrchestrationServiceStateInput,
    options?: VirtualMachineScaleSetsSetOrchestrationServiceStateOptionalParams
  ): Promise<void>;
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { BaseResource, CloudError, AzureServiceClientOptions } from "@azure/ms-rest-azure-js";
import * as msRest from "@azure/ms-rest-js";

export { BaseResource, CloudError };

/**
 * Display metadata associated with the operation.
 */
export interface OperationDisplay {
  /**
   * Service provider: Microsoft NetApp.
   */
  provider?: string;
  /**
   * Resource on which the operation is performed etc.
   */
  resource?: string;
  /**
   * Type of operation: get, read, delete, etc.
   */
  operation?: string;
  /**
   * Operation description.
   */
  description?: string;
}

/**
 * Dimension of blobs, possibly be blob type or access tier.
 */
export interface Dimension {
  /**
   * Display name of dimension.
   */
  name?: string;
  /**
   * Display name of dimension.
   */
  displayName?: string;
}

/**
 * Metric specification of operation.
 */
export interface MetricSpecification {
  /**
   * Name of metric specification.
   */
  name?: string;
  /**
   * Display name of metric specification.
   */
  displayName?: string;
  /**
   * Display description of metric specification.
   */
  displayDescription?: string;
  /**
   * Unit could be Bytes or Count.
   */
  unit?: string;
  /**
   * Dimensions of blobs, including blob type and access tier.
   */
  dimensions?: Dimension[];
  /**
   * Aggregation type could be Average.
   */
  aggregationType?: string;
  /**
   * The property to decide fill gap with zero or not.
   */
  fillGapWithZero?: boolean;
  /**
   * The category this metric specification belong to, could be Capacity.
   */
  category?: string;
  /**
   * Account Resource Id.
   */
  resourceIdDimensionNameOverride?: string;
}

/**
 * One property of operation, include metric specifications.
 */
export interface ServiceSpecification {
  /**
   * Metric specifications of operation.
   */
  metricSpecifications?: MetricSpecification[];
}

/**
 * Microsoft.NetApp REST API operation definition.
 */
export interface Operation {
  /**
   * Operation name: {provider}/{resource}/{operation}
   */
  name?: string;
  /**
   * Display metadata associated with the operation.
   */
  display?: OperationDisplay;
  /**
   * The origin of operations.
   */
  origin?: string;
  /**
   * One property of operation, include metric specifications.
   */
  serviceSpecification?: ServiceSpecification;
}

/**
 * Information regarding availability of a resource name.
 */
export interface ResourceNameAvailability {
  /**
   * <code>true</code> indicates name is valid and available. <code>false</code> indicates the name
   * is invalid, unavailable, or both.
   */
  isAvailable?: boolean;
  /**
   * <code>Invalid</code> indicates the name provided does not match Azure App Service naming
   * requirements. <code>AlreadyExists</code> indicates that the name is already in use and is
   * therefore unavailable. Possible values include: 'Invalid', 'AlreadyExists'
   */
  reason?: InAvailabilityReasonType;
  /**
   * If reason == invalid, provide the user with the reason why the given name is invalid, and
   * provide the resource naming requirements so that the user can select a valid name. If reason
   * == AlreadyExists, explain that resource name is already in use, and direct them to select a
   * different name.
   */
  message?: string;
}

/**
 * Resource name availability request content.
 */
export interface ResourceNameAvailabilityRequest {
  /**
   * Resource name to verify.
   */
  name: string;
  /**
   * Resource type used for verification. Possible values include:
   * 'Microsoft.NetApp/netAppAccounts', 'Microsoft.NetApp/netAppAccounts/capacityPools',
   * 'Microsoft.NetApp/netAppAccounts/capacityPools/volumes',
   * 'Microsoft.NetApp/netAppAccounts/capacityPools/volumes/snapshots'
   */
  type: CheckNameResourceTypes;
  /**
   * Resource group name.
   */
  resourceGroup: string;
}

/**
 * Active Directory
 */
export interface ActiveDirectory {
  /**
   * Id of the Active Directory
   */
  activeDirectoryId?: string;
  /**
   * Username of Active Directory domain administrator
   */
  username?: string;
  /**
   * Plain text password of Active Directory domain administrator
   */
  password?: string;
  /**
   * Name of the Active Directory domain
   */
  domain?: string;
  /**
   * Comma separated list of DNS server IP addresses (IPv4 only) for the Active Directory domain
   */
  dns?: string;
  /**
   * Status of the Active Directory
   */
  status?: string;
  /**
   * NetBIOS name of the SMB server. This name will be registered as a computer account in the AD
   * and used to mount volumes
   */
  smbServerName?: string;
  /**
   * The Organizational Unit (OU) within the Windows Active Directory
   */
  organizationalUnit?: string;
  /**
   * The Active Directory site the service will limit Domain Controller discovery to
   */
  site?: string;
}

/**
 * NetApp account resource
 */
export interface NetAppAccount extends BaseResource {
  /**
   * Resource location
   */
  location: string;
  /**
   * Resource Id
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly id?: string;
  /**
   * Resource name
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly name?: string;
  /**
   * Resource type
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly type?: string;
  /**
   * Resource tags
   */
  tags?: { [propertyName: string]: string };
  /**
   * Azure lifecycle management
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly provisioningState?: string;
  /**
   * Active Directories
   */
  activeDirectories?: ActiveDirectory[];
}

/**
 * NetApp account patch resource
 */
export interface NetAppAccountPatch extends BaseResource {
  /**
   * Resource location
   */
  location?: string;
  /**
   * Resource Id
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly id?: string;
  /**
   * Resource name
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly name?: string;
  /**
   * Resource type
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly type?: string;
  /**
   * Resource tags
   */
  tags?: { [propertyName: string]: string };
  /**
   * Azure lifecycle management
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly provisioningState?: string;
  /**
   * Active Directories
   */
  activeDirectories?: ActiveDirectory[];
}

/**
 * Capacity pool resource
 */
export interface CapacityPool extends BaseResource {
  /**
   * Resource location
   */
  location: string;
  /**
   * Resource Id
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly id?: string;
  /**
   * Resource name
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly name?: string;
  /**
   * Resource type
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly type?: string;
  /**
   * Resource tags
   */
  tags?: { [propertyName: string]: string };
  /**
   * poolId. UUID v4 used to identify the Pool
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly poolId?: string;
  /**
   * size. Provisioned size of the pool (in bytes). Allowed values are in 4TiB chunks (value must
   * be multiply of 4398046511104).
   */
  size: number;
  /**
   * serviceLevel. The service level of the file system. Possible values include: 'Standard',
   * 'Premium', 'Ultra'. Default value: 'Premium'.
   */
  serviceLevel: ServiceLevel;
  /**
   * Azure lifecycle management
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly provisioningState?: string;
}

/**
 * Capacity pool patch resource
 */
export interface CapacityPoolPatch extends BaseResource {
  /**
   * Resource location
   */
  location?: string;
  /**
   * Resource Id
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly id?: string;
  /**
   * Resource name
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly name?: string;
  /**
   * Resource type
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly type?: string;
  /**
   * Resource tags
   */
  tags?: { [propertyName: string]: string };
  /**
   * size. Provisioned size of the pool (in bytes). Allowed values are in 4TiB chunks (value must
   * be multiply of 4398046511104). Default value: 4398046511104.
   */
  size?: number;
  /**
   * serviceLevel. The service level of the file system. Possible values include: 'Standard',
   * 'Premium', 'Ultra'. Default value: 'Premium'.
   */
  serviceLevel?: ServiceLevel;
}

/**
 * Volume Export Policy Rule
 */
export interface ExportPolicyRule {
  /**
   * Order index
   */
  ruleIndex?: number;
  /**
   * Read only access
   */
  unixReadOnly?: boolean;
  /**
   * Read and write access
   */
  unixReadWrite?: boolean;
  /**
   * Allows CIFS protocol
   */
  cifs?: boolean;
  /**
   * Allows NFSv3 protocol
   */
  nfsv3?: boolean;
  /**
   * Allows NFSv4.1 protocol
   */
  nfsv41?: boolean;
  /**
   * Client ingress specification as comma separated string with IPv4 CIDRs, IPv4 host addresses
   * and host names
   */
  allowedClients?: string;
}

/**
 * Set of export policy rules
 * @summary exportPolicy
 */
export interface VolumePropertiesExportPolicy {
  /**
   * Export policy rule. Export policy rule
   */
  rules?: ExportPolicyRule[];
}

/**
 * Mount Target
 */
export interface MountTarget {
  /**
   * Resource location
   */
  location: string;
  /**
   * Resource Id
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly id?: string;
  /**
   * Resource name
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly name?: string;
  /**
   * Resource type
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly type?: string;
  /**
   * Resource tags
   */
  tags?: { [propertyName: string]: string };
  /**
   * mountTargetId. UUID v4 used to identify the MountTarget
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly mountTargetId?: string;
  /**
   * fileSystemId. UUID v4 used to identify the MountTarget
   */
  fileSystemId: string;
  /**
   * ipAddress. The mount target's IPv4 address
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly ipAddress?: string;
  /**
   * smbServerFQDN. The SMB server's Fully Qualified Domain Name, FQDN
   */
  smbServerFqdn?: string;
}

/**
 * Replication properties
 */
export interface ReplicationObject {
  /**
   * Id
   */
  replicationId?: string;
  /**
   * Indicates whether the local volume is the source or destination for the Volume Replication.
   * Possible values include: 'src', 'dst'
   */
  endpointType?: EndpointType;
  /**
   * Schedule. Possible values include: '_10minutely', 'hourly', 'daily', 'weekly', 'monthly'
   */
  replicationSchedule: ReplicationSchedule;
  /**
   * The resource ID of the remote volume.
   */
  remoteVolumeResourceId: string;
  /**
   * The remote region for the other end of the Volume Replication.
   */
  remoteVolumeRegion?: string;
}

/**
 * DataProtection type volumes include an object containing details of the replication
 * @summary DataProtection
 */
export interface VolumePropertiesDataProtection {
  /**
   * Replication. Replication properties
   */
  replication?: ReplicationObject;
}

/**
 * Volume resource
 */
export interface Volume extends BaseResource {
  /**
   * Resource location
   */
  location: string;
  /**
   * Resource Id
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly id?: string;
  /**
   * Resource name
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly name?: string;
  /**
   * Resource type
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly type?: string;
  /**
   * Resource tags
   */
  tags?: { [propertyName: string]: string };
  /**
   * FileSystem ID. Unique FileSystem Identifier.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly fileSystemId?: string;
  /**
   * Creation Token or File Path. A unique file path for the volume. Used when creating mount
   * targets
   */
  creationToken: string;
  /**
   * serviceLevel. The service level of the file system. Possible values include: 'Standard',
   * 'Premium', 'Ultra'. Default value: 'Premium'.
   */
  serviceLevel?: ServiceLevel;
  /**
   * usageThreshold. Maximum storage quota allowed for a file system in bytes. This is a soft quota
   * used for alerting only. Minimum size is 100 GiB. Upper limit is 100TiB. Specified in bytes.
   * Default value: 107374182400.
   */
  usageThreshold: number;
  /**
   * exportPolicy. Set of export policy rules
   */
  exportPolicy?: VolumePropertiesExportPolicy;
  /**
   * protocolTypes. Set of protocol types
   */
  protocolTypes?: string[];
  /**
   * Azure lifecycle management
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly provisioningState?: string;
  /**
   * Snapshot ID. UUID v4 or resource identifier used to identify the Snapshot.
   */
  snapshotId?: string;
  /**
   * Baremetal Tenant ID. Unique Baremetal Tenant Identifier.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly baremetalTenantId?: string;
  /**
   * The Azure Resource URI for a delegated subnet. Must have the delegation
   * Microsoft.NetApp/volumes
   */
  subnetId: string;
  /**
   * mountTargets. List of mount targets
   */
  mountTargets?: MountTarget[];
  /**
   * What type of volume is this
   */
  volumeType?: string;
  /**
   * DataProtection. DataProtection type volumes include an object containing details of the
   * replication
   */
  dataProtection?: VolumePropertiesDataProtection;
  /**
   * Restoring
   */
  isRestoring?: boolean;
}

/**
 * Replication status
 */
export interface ReplicationStatus {
  /**
   * Replication health check
   */
  healthy?: boolean;
  /**
   * Status of the mirror relationship. Possible values include: 'Idle', 'Transferring'
   */
  relationshipStatus?: RelationshipStatus;
  /**
   * The status of the replication. Possible values include: 'Uninitialized', 'Mirrored', 'Broken'
   */
  mirrorState?: MirrorState;
  /**
   * The progress of the replication
   */
  totalProgress?: string;
  /**
   * Displays error message if the replication is in an error state
   */
  errorMessage?: string;
}

/**
 * Set of export policy rules
 * @summary exportPolicy
 */
export interface VolumePatchPropertiesExportPolicy {
  /**
   * Export policy rule. Export policy rule
   */
  rules?: ExportPolicyRule[];
}

/**
 * Volume patch resource
 */
export interface VolumePatch extends BaseResource {
  /**
   * Resource location
   */
  location?: string;
  /**
   * Resource Id
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly id?: string;
  /**
   * Resource name
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly name?: string;
  /**
   * Resource type
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly type?: string;
  /**
   * Resource tags
   */
  tags?: { [propertyName: string]: string };
  /**
   * serviceLevel. The service level of the file system. Possible values include: 'Standard',
   * 'Premium', 'Ultra'. Default value: 'Premium'.
   */
  serviceLevel?: ServiceLevel;
  /**
   * usageThreshold. Maximum storage quota allowed for a file system in bytes. This is a soft quota
   * used for alerting only. Minimum size is 100 GiB. Upper limit is 100TiB. Specified in bytes.
   * Default value: 107374182400.
   */
  usageThreshold?: number;
  /**
   * exportPolicy. Set of export policy rules
   */
  exportPolicy?: VolumePatchPropertiesExportPolicy;
}

/**
 * List of Mount Targets
 */
export interface MountTargetList {
  /**
   * A list of Mount targets
   */
  value?: MountTarget[];
}

/**
 * Snapshot of a Volume
 */
export interface Snapshot extends BaseResource {
  /**
   * Resource location
   */
  location: string;
  /**
   * Resource Id
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly id?: string;
  /**
   * Resource name
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly name?: string;
  /**
   * Resource type
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly type?: string;
  /**
   * snapshotId. UUID v4 used to identify the Snapshot
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly snapshotId?: string;
  /**
   * fileSystemId. UUID v4 used to identify the FileSystem
   */
  fileSystemId?: string;
  /**
   * name. The creation date of the snapshot
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly created?: Date;
  /**
   * Azure lifecycle management
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly provisioningState?: string;
}

/**
 * revert a volume to the snapshot
 */
export interface VolumeRevert {
  /**
   * Resource id of the snapshot
   */
  snapshotId?: string;
}

/**
 * Authorize request
 */
export interface AuthorizeRequest {
  /**
   * Resource id of the remote volume
   */
  remoteVolumeResourceId?: string;
}

/**
 * Optional Parameters.
 */
export interface VolumesRevertOptionalParams extends msRest.RequestOptionsBase {
  /**
   * Resource id of the snapshot
   */
  snapshotId?: string;
}

/**
 * Optional Parameters.
 */
export interface VolumesAuthorizeReplicationOptionalParams extends msRest.RequestOptionsBase {
  /**
   * Resource id of the remote volume
   */
  remoteVolumeResourceId?: string;
}

/**
 * Optional Parameters.
 */
export interface VolumesBeginRevertOptionalParams extends msRest.RequestOptionsBase {
  /**
   * Resource id of the snapshot
   */
  snapshotId?: string;
}

/**
 * Optional Parameters.
 */
export interface VolumesBeginAuthorizeReplicationOptionalParams extends msRest.RequestOptionsBase {
  /**
   * Resource id of the remote volume
   */
  remoteVolumeResourceId?: string;
}

/**
 * Optional Parameters.
 */
export interface SnapshotsCreateOptionalParams extends msRest.RequestOptionsBase {
  /**
   * fileSystemId UUID v4 used to identify the FileSystem
   */
  fileSystemId?: string;
}

/**
 * Optional Parameters.
 */
export interface SnapshotsBeginCreateOptionalParams extends msRest.RequestOptionsBase {
  /**
   * fileSystemId UUID v4 used to identify the FileSystem
   */
  fileSystemId?: string;
}

/**
 * An interface representing AzureNetAppFilesManagementClientOptions.
 */
export interface AzureNetAppFilesManagementClientOptions extends AzureServiceClientOptions {
  baseUri?: string;
}

/**
 * @interface
 * Result of the request to list Cloud Volume operations. It contains a list of operations and a
 * URL link to get the next set of results.
 * @extends Array<Operation>
 */
export interface OperationListResult extends Array<Operation> {
}

/**
 * @interface
 * List of NetApp account resources
 * @extends Array<NetAppAccount>
 */
export interface NetAppAccountList extends Array<NetAppAccount> {
}

/**
 * @interface
 * List of capacity pool resources
 * @extends Array<CapacityPool>
 */
export interface CapacityPoolList extends Array<CapacityPool> {
}

/**
 * @interface
 * List of volume resources
 * @extends Array<Volume>
 */
export interface VolumeList extends Array<Volume> {
}

/**
 * @interface
 * List of Snapshots
 * @extends Array<Snapshot>
 */
export interface SnapshotsList extends Array<Snapshot> {
}

/**
 * Defines values for InAvailabilityReasonType.
 * Possible values include: 'Invalid', 'AlreadyExists'
 * @readonly
 * @enum {string}
 */
export type InAvailabilityReasonType = 'Invalid' | 'AlreadyExists';

/**
 * Defines values for CheckNameResourceTypes.
 * Possible values include: 'Microsoft.NetApp/netAppAccounts',
 * 'Microsoft.NetApp/netAppAccounts/capacityPools',
 * 'Microsoft.NetApp/netAppAccounts/capacityPools/volumes',
 * 'Microsoft.NetApp/netAppAccounts/capacityPools/volumes/snapshots'
 * @readonly
 * @enum {string}
 */
export type CheckNameResourceTypes = 'Microsoft.NetApp/netAppAccounts' | 'Microsoft.NetApp/netAppAccounts/capacityPools' | 'Microsoft.NetApp/netAppAccounts/capacityPools/volumes' | 'Microsoft.NetApp/netAppAccounts/capacityPools/volumes/snapshots';

/**
 * Defines values for ServiceLevel.
 * Possible values include: 'Standard', 'Premium', 'Ultra'
 * @readonly
 * @enum {string}
 */
export type ServiceLevel = 'Standard' | 'Premium' | 'Ultra';

/**
 * Defines values for EndpointType.
 * Possible values include: 'src', 'dst'
 * @readonly
 * @enum {string}
 */
export type EndpointType = 'src' | 'dst';

/**
 * Defines values for ReplicationSchedule.
 * Possible values include: '_10minutely', 'hourly', 'daily', 'weekly', 'monthly'
 * @readonly
 * @enum {string}
 */
export type ReplicationSchedule = '_10minutely' | 'hourly' | 'daily' | 'weekly' | 'monthly';

/**
 * Defines values for RelationshipStatus.
 * Possible values include: 'Idle', 'Transferring'
 * @readonly
 * @enum {string}
 */
export type RelationshipStatus = 'Idle' | 'Transferring';

/**
 * Defines values for MirrorState.
 * Possible values include: 'Uninitialized', 'Mirrored', 'Broken'
 * @readonly
 * @enum {string}
 */
export type MirrorState = 'Uninitialized' | 'Mirrored' | 'Broken';

/**
 * Contains response data for the list operation.
 */
export type OperationsListResponse = OperationListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: OperationListResult;
    };
};

/**
 * Contains response data for the checkNameAvailability operation.
 */
export type NetAppResourceCheckNameAvailabilityResponse = ResourceNameAvailability & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ResourceNameAvailability;
    };
};

/**
 * Contains response data for the checkFilePathAvailability operation.
 */
export type NetAppResourceCheckFilePathAvailabilityResponse = ResourceNameAvailability & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ResourceNameAvailability;
    };
};

/**
 * Contains response data for the list operation.
 */
export type AccountsListResponse = NetAppAccountList & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: NetAppAccountList;
    };
};

/**
 * Contains response data for the get operation.
 */
export type AccountsGetResponse = NetAppAccount & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: NetAppAccount;
    };
};

/**
 * Contains response data for the createOrUpdate operation.
 */
export type AccountsCreateOrUpdateResponse = NetAppAccount & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: NetAppAccount;
    };
};

/**
 * Contains response data for the update operation.
 */
export type AccountsUpdateResponse = NetAppAccount & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: NetAppAccount;
    };
};

/**
 * Contains response data for the beginCreateOrUpdate operation.
 */
export type AccountsBeginCreateOrUpdateResponse = NetAppAccount & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: NetAppAccount;
    };
};

/**
 * Contains response data for the list operation.
 */
export type PoolsListResponse = CapacityPoolList & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: CapacityPoolList;
    };
};

/**
 * Contains response data for the get operation.
 */
export type PoolsGetResponse = CapacityPool & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: CapacityPool;
    };
};

/**
 * Contains response data for the createOrUpdate operation.
 */
export type PoolsCreateOrUpdateResponse = CapacityPool & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: CapacityPool;
    };
};

/**
 * Contains response data for the update operation.
 */
export type PoolsUpdateResponse = CapacityPool & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: CapacityPool;
    };
};

/**
 * Contains response data for the beginCreateOrUpdate operation.
 */
export type PoolsBeginCreateOrUpdateResponse = CapacityPool & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: CapacityPool;
    };
};

/**
 * Contains response data for the beginUpdate operation.
 */
export type PoolsBeginUpdateResponse = CapacityPool & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: CapacityPool;
    };
};

/**
 * Contains response data for the list operation.
 */
export type VolumesListResponse = VolumeList & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: VolumeList;
    };
};

/**
 * Contains response data for the get operation.
 */
export type VolumesGetResponse = Volume & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Volume;
    };
};

/**
 * Contains response data for the createOrUpdate operation.
 */
export type VolumesCreateOrUpdateResponse = Volume & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Volume;
    };
};

/**
 * Contains response data for the update operation.
 */
export type VolumesUpdateResponse = Volume & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Volume;
    };
};

/**
 * Contains response data for the replicationStatusMethod operation.
 */
export type VolumesReplicationStatusMethodResponse = ReplicationStatus & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ReplicationStatus;
    };
};

/**
 * Contains response data for the beginCreateOrUpdate operation.
 */
export type VolumesBeginCreateOrUpdateResponse = Volume & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Volume;
    };
};

/**
 * Contains response data for the beginUpdate operation.
 */
export type VolumesBeginUpdateResponse = Volume & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Volume;
    };
};

/**
 * Contains response data for the list operation.
 */
export type SnapshotsListResponse = SnapshotsList & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: SnapshotsList;
    };
};

/**
 * Contains response data for the get operation.
 */
export type SnapshotsGetResponse = Snapshot & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Snapshot;
    };
};

/**
 * Contains response data for the create operation.
 */
export type SnapshotsCreateResponse = Snapshot & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Snapshot;
    };
};

/**
 * Contains response data for the update operation.
 */
export type SnapshotsUpdateResponse = Snapshot & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Snapshot;
    };
};

/**
 * Contains response data for the beginCreate operation.
 */
export type SnapshotsBeginCreateResponse = Snapshot & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Snapshot;
    };
};

/**
 * Contains response data for the beginUpdate operation.
 */
export type SnapshotsBeginUpdateResponse = Snapshot & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Snapshot;
    };
};

<?php declare(strict_types=1);

namespace Torq\Shopware\DynamicAccessEvolved\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1731713474CreateTorqDynamicAccessEvolvedRuleTable extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1731713474;
    }

    public function update(Connection $connection): void
    {
        $sql = <<<SQL
            CREATE TABLE `torq_dynamic_access_evolved` (
              `id` BINARY(16) NOT NULL,
              `name` VARCHAR(255) NOT NULL,
              `valid_from` DATETIME NULL,
              `valid_until` DATETIME NULL,
              `filter` JSON NULL,
              `can_only_access` TINYINT(1) NOT NULL DEFAULT 0,
              `active` TINYINT(1) NOT NULL DEFAULT 0,
              `created_at` DATETIME(3) NOT NULL,
              `updated_at` DATETIME(3) NULL,
              PRIMARY KEY (`id`)
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

            CREATE TABLE `torq_dynamic_access_evolved_customer_rule` (
              `torq_dynamic_access_evolved_id` BINARY(16) NOT NULL,
              `rule_id` BINARY(16) NOT NULL,
              PRIMARY KEY (`torq_dynamic_access_evolved_id`, `rule_id`),
                CONSTRAINT `fk.tdaecr.torq_dynamic_access_evolved_id` FOREIGN KEY (`torq_dynamic_access_evolved_id`)
                  REFERENCES `torq_dynamic_access_evolved` (id) ON DELETE CASCADE,
                CONSTRAINT `fk.tdaecr.rule_id` FOREIGN KEY (`rule_id`)
                  REFERENCES `rule` (id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

            CREATE TABLE `torq_dynamic_access_evolved_sales_channel` (
              `torq_dynamic_access_evolved_id` BINARY(16) NOT NULL,
              `sales_channel_id` BINARY(16) NOT NULL,
              PRIMARY KEY (`torq_dynamic_access_evolved_id`, `sales_channel_id`),
                CONSTRAINT `fk.tdaesc.torq_dynamic_access_evolved_id` FOREIGN KEY (`torq_dynamic_access_evolved_id`)
                  REFERENCES `torq_dynamic_access_evolved` (id) ON DELETE CASCADE,
                CONSTRAINT `fk.tdaesc.sales_channel_id` FOREIGN KEY (`sales_channel_id`)
                  REFERENCES `sales_channel` (id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

        SQL;

        $connection->executeStatement($sql);
    }

    public function updateDestructive(Connection $connection): void
    {
    }
}

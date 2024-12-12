<?php declare(strict_types=1);

namespace Torq\Shopware\DynamicAccessEvolved\Entity\DynamicAccessEvolved;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void add(DynamicAccessEvolvedEntity $entity)
 * @method void set(string $key, DynamicAccessEvolvedEntity $entity)
 * @method DynamicAccessEvolvedEntity[] getIterator()
 * @method DynamicAccessEvolvedEntity[] getElements()
 * @method DynamicAccessEvolvedEntity|null get(string $key)
 * @method DynamicAccessEvolvedEntity|null first()
 * @method DynamicAccessEvolvedEntity|null last()
 */
class DynamicAccessEvolvedCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return DynamicAccessEvolvedEntity::class;
    }
}

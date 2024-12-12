<?php declare(strict_types=1);

namespace Torq\Shopware\DynamicAccessEvolved\Entity\DynamicAccessEvolved;

use Shopware\Core\Content\Rule\RuleCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;
use Shopware\Core\System\SalesChannel\SalesChannelCollection;

class DynamicAccessEvolvedEntity extends Entity
{
    use EntityIdTrait;

    /**
     * @var string|null
     */
    protected $name;
    
    /**
     * @var array<string, mixed>|null
     */
    protected $filter;

    /**
     * @var bool
     */
    protected $active;

    /**
     * @var \DateTimeInterface|null
     */
    protected $validFrom;

    /**
     * @var \DateTimeInterface|null
     */
    protected $validUntil;

    /**
     * @var bool
     */
    protected $canOnlyAccess;

    /**
     * @var RuleCollection|null
     */
    protected $daeCustomerRules;

    /**
     * @var SalesChannelCollection|null
     */
    protected $daeSalesChannels;


    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return array<string, mixed>|null
     */
    public function getFilter(): ?array
    {
        return $this->filter;
    }

    /**
     * @param array<string, mixed>|null $value
     */
    public function setFilter(?array $filter): void
    {
        $this->filter = $filter;
    }

    /**
     * True: Only apply this rule to selected customers.
     * False: Only apply this rule to unselected customers.
     */
    public function isCanOnlyAccess(): bool
    {
        return $this->canOnlyAccess;
    }

    /**
     * True: Only apply this rule to selected customers.
     * False: Only apply this rule to unselected customers.
     */
    public function setApplyToSelectedCustomers(bool $canOnlyAccess): void
    {
        $this->canOnlyAccess = $canOnlyAccess;
    }

    public function isActive(): bool
    {
        return $this->active;
    }

    public function setActive(bool $active): void
    {
        $this->active = $active;
    }

    public function getValidFrom(): ?\DateTimeInterface
    {
        return $this->validFrom;
    }

    public function setValidFrom(\DateTimeInterface $validFrom): void
    {
        $this->validFrom = $validFrom;
    }

    public function getValidUntil(): ?\DateTimeInterface
    {
        return $this->validUntil;
    }

    public function setValidUntil(\DateTimeInterface $validUntil): void
    {
        $this->validUntil = $validUntil;
    }

    /**
     * Gets a list of all assigned sales channels for this rule.
     * Only customers within these channels will have the rule apply.
     */
    public function getDaeSalesChannels(): ?SalesChannelCollection
    {
        return $this->daeSalesChannels;
    }

    /**
     * Sets a list of permitted sales channels for this promotion.
     * Only customers within these channels will have the rule apply.
     */
    public function setDaeSalesChannels(SalesChannelCollection $daeSalesChannels): void
    {
        $this->daeSalesChannels = $daeSalesChannels;
    }

    /**
     * Gets a list of customers this rule applies to.
     */
    public function getDaeCustomerRules(): ?RuleCollection
    {
        return $this->daeCustomerRules;
    }

    /**
     * Sets what customers this rule applies to.
     */
    public function setDaeCustomerRules(RuleCollection $daeCustomerRules): void
    {
        $this->daeCustomerRules = $daeCustomerRules;
    }

}